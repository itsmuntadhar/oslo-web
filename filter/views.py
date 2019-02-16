from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import viewsets, permissions, views
from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from json import dumps
from .models import Word
from .serializers import UserSerializer, WordSerializer
from .permissions import IsStaffPermission
import pyarabic.araby as araby


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class WordViewSet(viewsets.ModelViewSet):
    """
    Word API endpoint
    """
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = (IsStaffPermission,)

    def create(self, request):
        if 'word' not in request.data or 'severity' not in request.data:
            return HttpResponse(dumps({'details': 'incomplete data'}), status=400, content_type='application/json')
        word = request.data['word']
        sev = request.data['severity']
        if len(word) < 2 or sev not in ('0', '1', '2'):
            return HttpResponse(dumps({'details': 'invalid data'}), status=400, content_type='application/json')
        if len(Word.objects.filter(word=word)) > 0:
            return HttpResponse(dumps({'details': 'word already added'}), status=400, content_type='application/json')
        w = Word.objects.create(
            word=word,
            severity=sev,
            user=request.user
        )
        return Response(data=WordSerializer(w).data, status=201, content_type='application/json')


class FilterViewSet(views.APIView):
    """
    api endpoint
    """

    renderer_classes = (JSONRenderer, )
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        """
        """
        if not request.data:
            return Response('invalid data', status=400)

        words = WordSerializer(Word.objects.all(), many=True).data
        found_words = []
        censored_text = request.data['text'].upper()
        text = araby.strip_tashkeel(request.data['text']).upper()
        for word in words:
            w = word['word'].upper()
            if w in text:
                found_words.append(w)
                censored_text = censored_text.replace(
                    w, ''.join(['*' for i in range(0, len(w))]))
        resp = {'count': len(found_words), 'word': found_words,
                'censored_text': censored_text}
        return Response(resp, status=200)
