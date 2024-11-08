# serializer.py

from bson import ObjectId

def serialize_dict(a) -> dict:
    return {**{i: str(a[i]) if isinstance(a[i], ObjectId) else a[i] for i in a}}

def serialize_list(entity) -> list:
    return [serialize_dict(a) for a in entity]
