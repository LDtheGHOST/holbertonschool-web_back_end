#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict, Any


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
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        Returns a dictionary with pagination details, resiliant to deletion

        Parameters:
            index (int): The index of the data to retrieve
            page_size (int): The number of items per page

        Returns:
            Dict[str, Any]: A dictionary with the following key-value pairs
                - index (int): The current index of the data
                - next_index (int): The next index of the data
                - page_size (int): The number of items per page
                - data (List): The page of data
        """
        assert index is not None and isinstance(index, int) and \
            0 <= index < len(self.indexed_dataset()), \
            "index must be a valid index in the dataset"

        indexed_dataset = self.indexed_dataset()
        data = []
        next_index = index

        for next_index in range(index, index + page_size):
            if next_index in indexed_dataset:
                data.append(indexed_dataset[next_index])
            else:
                next_index += 1
        return {
            'index': index,
            'next_index': next_index,
            'page_size': page_size,
            'data': data
        }