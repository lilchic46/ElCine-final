# -*- encoding: utf-8 -*-
# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import LoginForm, SignUpForm
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.throttling import UserRateThrottle


class OncePerDayUserThrottle(UserRateThrottle):
    rate = '1/day'

def login_view(request):
    return render(request, "accounts/login.html")

@api_view(['POST'])
def signin(request):
    try: 
        uername = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=uername, password=password)

        if user is not None:
            login(request, user)
            return Response({'status': 0, 'message': "login success"})
        else:
            return Response({'status': -1, 'message': 'username or password is invalid'}) 
    except Exception as e:
        return Response({'status': -2, 'message': str(e)})

@api_view(['POST'])
def signup(request):
    try: 
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password1']
        password2 = request.POST['password2']

        if password != password2:
            return Response({'status': -1, 'message': 'Password not match'})
 
        User.objects.create_user(username=username,email=email,password=password)
        user = authenticate(username=username, password=password)
        if user is not None:
            return Response({'status': 0, 'message': 'Sign up success'})
        else:
            return Response({'status': -1, 'message': 'Invalid credentials'})
    except Exception as e:
        return Response({'status': -2, 'message': str(e)})

def register_user(request):
    msg = None
    success = False

    if request.method == "POST":
        form = SignUpForm(request.POST)
        #import pdb; pdb.set_trace()
        if form.is_valid():
            username = form.cleaned_data.get("username")
            email = form.cleaned_data.get('email')
            password1 = form.cleaned_data.get('password1')
            User.objects.create_user(username,email, password1)
            user = authenticate(username=username, password=password1)
            msg = 'User created - please <a href="/login">login</a>.'
            success = True
            return redirect("/login/")

        else:
            msg = 'Form is not valid'
    else:
        form = SignUpForm()

    return render(request, "accounts/register.html", {"form": form, "msg": msg, "success": success})
