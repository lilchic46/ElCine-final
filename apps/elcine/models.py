from django.db import models
from django.db.models.fields import CharField, TextField
from django.db.models.fields.related import ForeignKey


class TimestampedModel(models.Model):
  # A timestamp representing when this object was created.
  created_at = models.DateTimeField(auto_now_add=True)
  # A timestamp reprensenting when this object was last updated.
  updated_at = models.DateTimeField(auto_now=True)
  class Meta:
    abstract = True
    # By default, any model that inherits from `TimestampedModel` should
    # be ordered in reverse-chronological order. We can override this on a
    # per-model basis as needed, but reverse-chronological is a good
    # default ordering for most models.
    ordering = ['-created_at', '-updated_at']

class Group(TimestampedModel):
  id = models.BigAutoField(primary_key=True)
  name = models.CharField(max_length=300)

  def __str__(self):
    return self.name
  class Meta:
    db_table = 'groups'

class Movies(TimestampedModel):
  id = models.BigAutoField(primary_key=True)
  group = models.ForeignKey(Group, on_delete=models.CASCADE, blank=True)

  title = models.CharField(blank=True, max_length=500)
  description = models.TextField(blank=True)
  
  year = models.CharField(max_length=10)
  rating = models.CharField(max_length=150, blank=True)
  runtime = models.CharField(max_length=50,blank=True)
  price = models.FloatField(default=0)
  
  director = models.CharField(max_length=300, blank=True)
  cast = models.CharField(max_length=300, blank=True)
  category = models.CharField(max_length=300, blank=True)

  poster_url = models.CharField(max_length=100,blank=True)
  video_url = models.CharField(max_length=100, blank=True)
  trailer = models.CharField(max_length=100, blank=True)

  is_favorite = models.BooleanField(default=False)
  is_billing = models.BooleanField(default=False)

  def __str__(self):
    return self.title
  class Meta:
    db_table = 'movies'

class Review(TimestampedModel):
  id = models.BigAutoField(primary_key=True)
  movie = models.ForeignKey(Movies, on_delete=models.CASCADE)
  description = models.TextField(blank=True)
  rate = models.PositiveIntegerField(default=0)
  
  class Meta:
    db_table = 'reviews'
