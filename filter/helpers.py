def unify_hamza(text):
    """
    unify varying writings of hamza
    """
    return text.replace('أ', 'ا').replace('إ', 'ا').replace('آ', 'ا')


def strip_arabic_marks(text):
    """
    remove arabic marks from text
    """
    return text.replace('َ', '').replace('ً', '').replace('ُ', '').replace('ٌ', '').replace('ِ', '').replace('ٍ', '').replace('', '').replace('~', '').replace('ْ', '').replace('ّ', '')


def fix_arabic(text):
    """
    perfome fixes like removing marks and unifying hamza
    """
    return unify_hamza(strip_arabic_marks(text))
