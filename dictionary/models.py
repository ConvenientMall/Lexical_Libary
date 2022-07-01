from django.db import models


class Language(models.Model):
    name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')


class Word(models.Model):
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    word = models.CharField(max_length=200)
    position = models.CharField(max_length=20)
    english = models.CharField(max_length=100, default=" ")
    definition = models.TextField(default=" ")
    notes = models.TextField(default=" ")

