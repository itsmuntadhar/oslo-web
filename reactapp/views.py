from django.contrib.staticfiles.views import serve


def index(request):
    # with open(os.path.join(settings.REACT_APP, 'build', 'index.html')) as file:
    #     return HttpResponse(file.read())
    return serve(request, 'reactapp/build/index.html')
