from django.contrib.auth.models import User
from django.db import models
from . import choices


class Word(models.Model):

    # the user who added the word
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, null=False)

    # the actual word :/
    word = models.CharField(max_length=16, null=False, unique=True)

    # level of severity
    severity = models.CharField(
        max_length=8, choices=choices.SEVERITY_CHOICES, default=choices.SEVERITY_MEDIUM)

    def __str__(self):
        return self.word
