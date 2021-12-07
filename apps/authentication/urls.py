# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path
from .views import login_view, register_user, signin, signup
from django.contrib.auth.views import LogoutView

'''
accounts/password_change/ [name='password_change']
accounts/password_change/done/ [name='password_change_done']
accounts/password_reset/ [name='password_reset']
accounts/password_reset/done/ [name='password_reset_done']
accounts/reset/<uidb64>/<token>/ [name='password_reset_confirm']
accounts/reset/done/ [name='password_reset_complete']
'''
urlpatterns = [
    path('signin/', login_view, name="sign in"),
    path('signup/', register_user, name="sign up"),
    path("logout/", LogoutView.as_view(), name="logout"),

    path('api/signin/', signin, name="sign in"),
    path('api/signup/', signup, name="sign up"),
]
