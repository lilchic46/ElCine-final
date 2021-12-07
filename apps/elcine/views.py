from apps.elcine.models import Movies
from django.db import models
from django.db.models.expressions import Value
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.throttling import UserRateThrottle
from rest_framework.response import Response
from django.forms.models import model_to_dict
from django.core.serializers import serialize
from .models import Group, Movies

class OncePerDayUserThrottle(UserRateThrottle):
    rate = '1/day'


@api_view(['GET'])
@throttle_classes([OncePerDayUserThrottle])
def test(request):
    return Response({"message": "Hello for today! See you tomorrow!"})


@api_view(['GET'])
def home_page(request):
    '''
    get list of movies in database
    '''
    data = []
    group_hot = Group.objects.get(name='Hot movie')
    movies =  Movies.objects.filter(group=group_hot).values_list('id', 'title', 'poster_url')
    items_hot = []
    for i in movies:
        items_hot.append({'id': i[0], 'img': '<img alt="'+i[1]+'" class="hover-img-topten" src="/media/poster/'+i[2]+'">'})
    
    data.append({
            'group': 'Top 5 best movies',
            'items': items_hot
    })
    new_arrival = Group.objects.get(name='New arrival')
    item_arrival = []
    movies =  Movies.objects.filter(group=new_arrival).values_list('id', 'title', 'poster_url')
    for i in movies:
        item_arrival.append({'id': i[0], 'img': '<img alt="'+i[1]+'" class="hover-img-topten" src="/media/poster/'+i[2]+'">'})
    data.append({
            'group': 'New arrival on ElCine',
            'items': item_arrival
    })
    action = Group.objects.get(name='Action movie')
    item_action = []
    movies =  Movies.objects.filter(group=action).values_list('id', 'title', 'poster_url')
    for i in movies:
        item_action.append({'id': i[0], 'img': '<img alt="'+i[1]+'" class="hover-img-topten" src="/media/poster/'+i[2]+'">'})
    data.append({
            'group': 'New arrival on ElCine',
            'items': item_action
    })

    return Response({'status': 0, 'data': data})


@api_view(['GET'])
def movies_list(request):
    data = []
    groups = Group.objects.all()
    for group in groups:
        movies =  Movies.objects.filter(group=group).values_list('id', 'title', 'poster_url')
        items = []
        for i in movies:
            items.append({'id': i[0], 'img': '<img alt="'+i[1]+'" class="hover-img-topten" src="/media/poster/'+i[2]+'">'})
        data.append({
            'group': group.name,
            'items': items
        })

    return Response({'status': 0, 'data': data}) 

@api_view(['GET'])
def new_arrival(request):
    data = []
    group_hot = Group.objects.get(name='New arrival')
    movies =  Movies.objects.filter(group=group_hot).values_list('id', 'title', 'poster_url')
    items_hot = []
    for i in movies:
        items_hot.append({'id': i[0], 'img': '<img alt="'+i[1]+'" class="hover-img-topten" src="/media/poster/'+i[2]+'">'})
    
    data.append({
            'group': 'New arrival',
            'items': items_hot
    })
    return Response({'status': 0, 'data': data}) 



@api_view(['GET'])
def my_list(request):
    data = []
    movies =  Movies.objects.filter(is_favorite=True).values_list('id', 'title', 'poster_url')
    favorite_movies = []
    for i in movies:
        favorite_movies.append({'id': i[0], 'img': '<img alt="'+i[1]+'" class="hover-img-topten" src="/media/poster/'+i[2]+'">'})
    
    data.append({
            'group': 'My favorite movie',
            'items': favorite_movies
    })
    return Response({'status': 0, 'data': data}) 

@api_view(['POST'])
def add_mylist(request):
    try:
        id = request.POST.get('id')
        movie = Movies.objects.get(id=id)
        movie.is_favorite = True 
        movie.save() 
        return Response({'status': 0, 'data': model_to_dict(movie)})
    except Exception as e:
        return Response({'status': -1, 'data': str(e)}) 

@api_view(['POST'])
def pay_movie(request):
    try:
        id = request.POST.get('id')
        movie = Movies.objects.get(id=id)
        movie.is_billing = True 
        movie.save() 
        return Response({'status': 0, 'data': model_to_dict(movie)})
    except Exception as e:
        return Response({'status': -1, 'data': str(e)})

    
@api_view(['POST'])
def search_movie(request):

    title = request.POST.get('title')
    category = request.POST.get('category')
    movie = Movies.objects.filter(title=title)
    return Response({'status': 0, 'data': movie}) 

@api_view(['GET'])
def get_movie_detail(request):
    try:
        id = request.GET['id']
        import pdb;pdb.set_trace()
        movie = Movies.objects.filter(pk=id).values_list('group__name','title', 'description', \
            'year','rating','runtime','price', 'director','cast', 'category', 'poster_url', 'video_url', 'trailer').get()
        #data = serialize("json", project) 
        response = {
            'group': movie[0],
            'title':movie[1],
            'description':movie[2],
            'year':movie[3],
            'rating':movie[4],
            'runtime':movie[5],
            'price': movie[6],
            'director': movie[7],
            'cast': movie[8],
            'category': movie[9],
            'poster_url': movie[10],
            'video_url': movie[11],
            'trailer': movie[12]
        }
        return Response({"status": 0, "data": response}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'status': -1, 'message': str(e)}, status=status.HTTP_200_OK)



@api_view(['GET'])
def get_account(request):
    current_user = request.user
    return Response({'status': 0, 'data': model_to_dict(current_user)})

    
    
