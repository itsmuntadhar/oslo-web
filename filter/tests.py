from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework.test import APIClient

from .models import Word
from . import choices


class TextTestCase(TestCase):
    """
    testing the filter
    """

    def setUp(self):
        """
        creating a user and adding some words
        """
        u = User.objects.create_superuser(
            username='superuser',
            email='superuser@email.com',
            password='Str0ngP@55'
        )
        Word.objects.create(
            user=u,
            word='كس',
            severity=choices.SEVERITY_HIGH
        )
        Word.objects.create(
            user=u,
            word='كسخت',
            severity=choices.SEVERITY_HIGH
        )

    def filter_test(self):
        """
        actual test :/
        """
        test_client = APIClient()
        resp = test_client.post(
            '/api/filter/', {'text': 'تجربة الـAPI'}, content_type='application/json')
        json = resp.json()
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.keys()), 3)
        self.assertEqual(json['count'], 0)

        resp = test_client.post(
            '/api/filter/', {'text': 'كسخت هالسالفة كُس'}, content_type='application/json')
        json = resp.json()
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.keys()), 3)
        self.assertEqual(json['count'], 2)
