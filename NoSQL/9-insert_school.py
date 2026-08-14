#!/usr/bin/env python3
"""Module that provides a function to insert a document into a collection."""


def insert_school(mongo_collection, **kwargs):
    """Inserts a new document into a collection.

    Args:
        mongo_collection: The pymongo collection object.
        **kwargs: Key-value pairs representing the document to insert.

    Returns:
        The ID of the inserted document.
    """
    return mongo_collection.insert_one(kwargs).inserted_id
