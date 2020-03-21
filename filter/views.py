from json import dumps
from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import viewsets, permissions, views
from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
import pyarabic.araby as araby
from .models import Word
from .serializers import UserSerializer, WordSerializer
from .permissions import IsStaffPermission
from .helpers import fix_arabic


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
            return Response({'details': 'incomplete data'}, status=400)
        word = request.data['word']
        sev = request.data['severity']
        if len(word) < 2 or sev not in ('0', '1', '2'):
            return Response({'details': 'incomplete data'}, status=400)
        if len(Word.objects.filter(word=word)) > 0:
            return Response({'details': 'word was already added'}, status=400)
        w = Word.objects.create(
            word=word,
            severity=sev,
            user=request.user
        )
        return Response(data=WordSerializer(w).data, status=201)


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

        sev = request.data.get('severity', 1)
        sev = sev if sev in (0, 1, 2) else 1
        force_space_around = request.data.get('force_space_around', 1) == 1
        query_filter = Q()
        while sev < 3:
            query_filter = query_filter | Q(severity=str(sev))
            sev += 1
        words = Word.objects.filter(query_filter)
        words_found = []
        og_text = request.data.get('text', '')
        og_text = fix_arabic(og_text)
        censored_text = og_text
        text_to_be_searched = og_text
        for word in words:
            w = word.word.upper()
            w = f' {w} ' if force_space_around else w
            if w in text_to_be_searched:
                words_found.append(w)
                censored_text = censored_text.replace(
                    w, ''.join(['*' for i in range(len(w))]))
        resp = {'count': len(words_found), 'words': words_found,
                'censored_text': censored_text}
        return Response(resp, status=200)
