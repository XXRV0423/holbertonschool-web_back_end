#!/usr/bin/env python3
"""Module that provides a function to update topics of school documents."""


def update_topics(mongo_collection, name, topics):
    """Updates the topics of a school document based on its name.

    Args:
        mongo_collection: The pymongo collection object.
        name: The name of the school to update.
        topics: A list of topics to add to the school's topics.

    Returns:
        The result of the update operation.
    """
    return mongo_collection.update_many(
        {"name": name},
        {"$set": {"topics": topics}}
    )
