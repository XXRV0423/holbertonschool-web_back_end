#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """Return a dictionary contaning pagination metadata that is
        resilient to deletions from the dataset between queries.

        Args:
            index (int): The current index of the dataset.
            page_size (int): The number of items per page.

        Returns:
            dict: A dictionary containing pagination metadata and
            the data for the requested page.
        """
        indexed_dataset = self.indexed_dataset()
        data_lenght = len(indexed_dataset)

        assert index is not None and 0 <= index < data_lenght

        data = []
        current_index = index
        keys_checked = 0

        while len(data) < page_size and keys_checked < data_lenght:
            if current_index in indexed_dataset:
                data.append(indexed_dataset[current_index])
                keys_checked += 1
            current_index += 1

        return {
            "index": index,
            "next_index": current_index,
            "page_size": len(data),
            "data": data
        }
