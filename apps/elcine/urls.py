
from django.urls import path, re_path

from .crud import (
        MoviesList, MovieDetail,
        GroupList, GroupDetail
    )

from .views import (get_account, test, 
        home_page, movies_list,
        new_arrival, my_list, get_movie_detail,
        get_account, add_mylist, pay_movie,
        search_movie)

urlpatterns = [

    # The home page
    path('', test, name='test'),
    
    # CRUD models 
    path('movies/', MoviesList.as_view() ),
    path('movies/<int:pk>/', MovieDetail.as_view()),

    path('groups/', GroupList.as_view() ),
    path('groups/<int:pk>/', GroupDetail.as_view()),

    ## Api
    path('home', home_page, name='home data'),
    path('movies_list', movies_list, name='movie list'),
    path('new_arrival', new_arrival, name='new arrival'),
    path('my_list', my_list, name='my list'),
    path('get_movie', get_movie_detail, name='get detail movies'),
    path('account', get_account, name='get detail account'),

    path('add_list', add_mylist, name='add movie into my list'),
    path('pay_movie', pay_movie, name = 'payment'),
    path('search_movie', search_movie, name = 'search movie')




    # Matches any html file

]
