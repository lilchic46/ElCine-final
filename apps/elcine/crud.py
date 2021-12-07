from django.db import models
from django.db.models.expressions import Value
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.throttling import UserRateThrottle
from rest_framework.response import Response
from .models import Group, Movies
from django.forms.models import model_to_dict
from django.core.serializers import serialize

class OncePerDayUserThrottle(UserRateThrottle):
    rate = '1/day'

@api_view(['GET'])
@throttle_classes([OncePerDayUserThrottle])
def test(request):
    return Response({"message": "Hello for today! See you tomorrow!"})

class GroupList(APIView):
    """
    List all Genre.
    """
    def get(self, request):
        group = Group.objects.values('id', 'name')
        return Response({'status': 0, 'data': group})
    
    def post(self, request):
        try:
            name  = request.data['name']
            group = Group.objects.create(name=name)
            return Response({'status': 0, 'data': model_to_dict(group)} ,status=status.HTTP_200_OK )
        except Exception as e:
            return Response({'status': -1, 'message': str(e)}, status=status.HTTP_200_OK)

class GroupDetail(APIView):
    """
    Genre Detail
    """
    def _get_object(self, pk):
        try:
            return Group.objects.get(pk=pk)
        except Group.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self, request, pk, format=None):
        genre = self._get_object(pk)
        return Response({'status': 0, "data": model_to_dict(genre)})

    def put(self,request, pk, format=None):
        try:
            genre = self._get_object(pk)
            genre.name = request.data['name']
            genre.save()
            return Response({'status': 0, 'data': model_to_dict(genre)}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status': -1, 'message': str(e)}, status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
        try:
            genre = self._get_object(pk)
            genre.delete()
            return Response({'status':0, 'message' : 'delete success'},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status': -1, 'message' : str(e) },status=status.HTTP_200_OK)

class MoviesList(APIView):
    """
    List all Movie, or create a new movie.
    """
    def get(self, request, format=None):
        movies=  Movies.objects.all().values('id', 'group__name', 'title', 'description', 'year', 'rating','runtime', \
            'price','director','cast','category', 'poster_url', 'video_url', 'trailer') 
        return Response({"status": "success", "data": movies}, status.HTTP_200_OK)

    def post(selt, request,format=None):
        try:
            group_name = request.data['group']
            title = request.data['title']
            description = request.data['description']
            year = request.data['year']
            rating = request.data['rating']
            runtime = request.data['runtime']
            price = request.data['price']
            director = request.data['director']
            cast = request.data['cast']
            category = request.data['category']
            poster_url = request.data['poster_url']
            video_url = request.data['video_url']
            trailer = request.data['trailer']

            group = Group.objects.get(name=group_name)

            movie = Movies.objects.create(group=group,
                                    title = title,
                                    description = description,
                                    year = year,
                                    rating = rating,
                                    runtime = runtime,
                                    price = price,
                                    director=director,
                                    cast=cast,
                                    category=category, 
                                    poster_url = poster_url,
                                    video_url = video_url,
                                    trailer = trailer
                                )
            return Response({'status': 0, 'data': model_to_dict(movie)},status=status.HTTP_201_CREATED )
        except Exception as e:
            return Response({'status': -1, 'message': str(e)}, status=status.HTTP_200_OK)

class MovieDetail(APIView):
    '''
    Update the movie detail
    '''
    def _get_object(self, pk):
        try:
            return Movies.objects.get(pk=pk)
        except Movies.DoesNotExist:
            raise status.HTTP_400_BAD_REQUEST

    def get(self,request, pk,format=None):
        movie = Movies.objects.filter(pk=pk).values_list('group__name','title', 'description', \
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

    def put(self,request, pk, format=None):
        try:
            movie = self._get_object(pk)

            movie.title = request.data['title']
            movie.description = request.data['description']
            movie.year = request.data['year']
            movie.rating = request.data['rating']
            movie.runtime = request.data['runtime']
            movie.price = request.data['price']
            movie.director = request.data['director']
            movie.cast = request.data['cast']
            movie.category = request.data['category']
            movie.poster_url = request.data['poster_url']
            movie.video_url = request.data['video_url']
            movie.trailer = request.data['trailer']
            movie.save()
            
            return Response({'status' : 0, 'data' : model_to_dict(movie)}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status': -1, 'message': str(e)}, status=status.HTTP_200_OK)

    def delete(self,request,pk, format=None):
        try:
            movie = self._get_object(pk)
            movie.delete()
            return Response({'status': 0, 'message' : 'delete success'},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'status': -1, 'message': str(e)}, status=status.HTTP_200_OK)