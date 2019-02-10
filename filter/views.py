from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, views
from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .models import Word
from .serializers import UserSerializer, WordSerializer
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
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


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
        censored_text = request.data['text']
        text = araby.strip_tashkeel(request.data['text'])
        for word in words:
            if word['word'] in text:
                found_words.append(word['word'])
                censored_text = censored_text.replace(
                    word['word'], ''.join(['*' for i in range(0, len(word['word']))]))
        resp = {'count': len(found_words), 'word': found_words,
                'censored_text': censored_text}
        return Response(resp, status=200)
