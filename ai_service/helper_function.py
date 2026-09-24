import math

def get_magnitude(a):
    return math.sqrt(sum(x * x for x in a))

def cosine_similarity(a,b):
    dot_product = sum(x * y for x, y in zip(a,b))

    magnitude_a = get_magnitude(a)
    magnitude_b = get_magnitude(b)

    return dot_product / (magnitude_a * magnitude_b)
