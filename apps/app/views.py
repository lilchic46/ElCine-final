# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from .data import *
import random

from apps.elcine.models import Group, Movies

def home(request):
    context = {'segment': 'home'}
    html_template = loader.get_template('home.html')
    return HttpResponse(html_template.render(context, request))

@login_required(login_url="/signin/")
def index(request):
    context = {'segment': 'index'}
    group = Group.objects.get(name='Hot movie')
    movie_list = Movies.objects.filter(group=group)
    movie = movie_list[random.randint(0,len(movie_list) -1)]
    context['id'] = movie.id
    context['group'] = movie.group.name
    context['title'] = movie.title
    context['description'] = movie.description
    context['year'] = movie.year
    context['category'] = movie.category
    context['rating'] = movie.rating
    context['price'] = movie.price
    context['director'] = movie.director
    context['cast'] = movie.cast
    context['runtime'] = movie.runtime
    context['poster_url'] = '/media/poster/' + movie.poster_url
    context['video_url'] = '/media/video/' + movie.video_url
    context['trailer'] = '/media/video/' + movie.trailer
    html_template = loader.get_template('index.html')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/signin/")
def pages(request):
    context = {}
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    try:

        load_template = request.path.split('/')[-1]
        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        context['segment'] = load_template
        html_template = loader.get_template(load_template)
        if load_template == 'movie-rental.html':
            id = request.GET['id']
            movie = Movies.objects.filter(pk=id).get()
            current_user = request.user
            context['username'] = current_user.username 
            context['id'] = movie.id
            context['group'] = movie.group.name
            context['title'] = movie.title
            context['description'] = movie.description
            context['year'] = movie.year
            context['category'] = movie.category
            context['rating'] = movie.rating
            context['price'] = movie.price
            context['director'] = movie.director
            context['cast'] = movie.cast
            context['runtime'] = movie.runtime
            context['poster_url'] = '/media/poster/' + movie.poster_url
            context['video_url'] = '/media/video/' + movie.video_url
            context['trailer'] = '/media/video/' + movie.trailer
            return HttpResponse(html_template.render(context, request))
                                       
        elif load_template == 'movie-watch.html':
            id = request.GET['id']
            movie = Movies.objects.get(id=id)
            context['video_url'] = '/media/video/' + movie.video_url
            return HttpResponse(html_template.render(context, request))
        elif  load_template == 'movie-detail.html':
            id = request.GET['id']
            movie = Movies.objects.filter(pk=id).get()
            context['id'] = movie.id
            context['group'] = movie.group.name
            context['title'] = movie.title
            context['is_favorite'] = movie.is_favorite
            context['is_billing'] = movie.is_billing

            context['description'] = movie.description
            context['year'] = movie.year
            context['category'] = movie.category
            context['rating'] = movie.rating
            context['price'] = movie.price
            context['director'] = movie.director
            context['cast'] = movie.cast
            context['runtime'] = movie.runtime
            context['poster_url'] = '/media/poster/' + movie.poster_url
            context['video_url'] = '/media/video/' + movie.video_url
            context['trailer'] = '/media/video/' + movie.trailer
            return HttpResponse(html_template.render(context, request))
                
        elif load_template == 'movie-list.html':
            # get random hot movie to display on banner
            group = Group.objects.get(name='Hot movie')
            movie_list = Movies.objects.filter(group=group)
            movie = movie_list[random.randint(0,len(movie_list) -1)]
            context['id'] = movie.id
            context['group'] = movie.group.name
            context['title'] = movie.title
            context['description'] = movie.description
            context['year'] = movie.year
            context['category'] = movie.category
            context['rating'] = movie.rating
            context['price'] = movie.price
            context['director'] = movie.director
            context['cast'] = movie.cast
            context['runtime'] = movie.runtime
            context['is_favorite'] = movie.is_favorite
            context['is_billing'] = movie.is_billing
            context['poster_url'] = '/media/poster/' + movie.poster_url
            context['video_url'] = '/media/video/' + movie.video_url
            context['trailer'] = '/media/video/' + movie.trailer
            return HttpResponse(html_template.render(context, request))
        elif load_template == 'new-arrival.html':
            group = Group.objects.get(name='New arrival')
            movie_list = Movies.objects.filter(group=group)
            movie = movie_list[random.randint(0,len(movie_list) -1)]
            context['id'] = movie.id
            context['is_favorite'] = movie.is_favorite
            context['is_billing'] = movie.is_billing
            context['group'] = movie.group.name
            context['title'] = movie.title
            context['description'] = movie.description
            context['year'] = movie.year
            context['category'] = movie.category
            context['rating'] = movie.rating
            context['price'] = movie.price
            context['director'] = movie.director
            context['cast'] = movie.cast
            context['runtime'] = movie.runtime
            context['poster_url'] = '/media/poster/' + movie.poster_url
            context['video_url'] = '/media/video/' + movie.video_url
            context['trailer'] = '/media/video/' + movie.trailer
            return HttpResponse(html_template.render(context, request))
        elif load_template == 'account.html':
            current_user = request.user
            context['username'] = current_user.username 
            context['email'] = current_user.email 
            context['password'] = current_user.password
            return HttpResponse(html_template.render(context, request))
        else:
            return HttpResponse(html_template.render(context, request))


    except template.TemplateDoesNotExist:

        html_template = loader.get_template('page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('page-500.html')
        return HttpResponse(html_template.render(context, request))
