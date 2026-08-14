#!/usr/bin/env python3
"""Module that provides a function to find schools having a specific topic"""


def schools_by_topic(mongo_collection, topic):
    """Returns the list of schools having a specific topic

    Args:
        mongo_collection: the pymongo collection object
        topic (str): the topic searched

    Returns:
        A list of documents matching the topic
    """
    return list(mongo_collection.find({"topics": topic}))
