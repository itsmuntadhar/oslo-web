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

    def list(self, request):
        """
        list words
        """
        offset = int(request.GET.get('offset', 0))
        limit = int(request.GET.get('limit', 25))
        exact_sev = int(request.GET.get('exact_sev', 1)) == 1
        sev = int(request.GET.get('severity', 1))

        if offset < 0:
            return Response(data="offset cannot be less than zero!", status=400)
        if 1 > limit > 50:
            return Response(data="limit must be between 1 and 50", status=400)
        if 0 > sev > 2:
            return Response(data="severity must be between 0 and 2", status=400)
        query_filter = Q(severity=str(sev))
        if not exact_sev:
            while sev < 3:
                query_filter = query_filter | Q(severity=str(sev))
                sev += 1
        words = Word.objects.filter(query_filter)
        words = words[offset:offset+limit]
        words = WordSerializer(instance=words, many=True).data
        return Response(data=words, status=200, content_type='application/json')

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
        leading_space = request.data.get('leading_space', 0) == 1
        trailing_space = request.data.get('trailing_space', 0) == 1
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
        censored_text_last_index = len(og_text) - 1
        for word in words:
            w = word.word.upper()
            if w in text_to_be_searched:
                index = censored_text.index(w)
                if leading_space:
                    if index > 0 and censored_text[index - 1] != ' ':
                        continue
                if trailing_space:
                    print(censored_text_last_index)
                    if index + len(w) <= censored_text_last_index and censored_text[index + len(w)] != ' ':
                        continue
                words_found.append(w)
                censored_text = censored_text.replace(
                    w, ''.join(['*' for i in range(len(w))]))
        resp = {'count': len(words_found), 'words': words_found,
                'censored_text': censored_text}
        return Response(resp, status=200)
