#!/usr/bin/env python3
"""
Module for 2-hypermedia_pagination
"""
import csv
import math
from typing import Tuple, List, Dict, Any


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calulates the start and end index for the given page and page_size

    Parameters:
    page (int): The page number
    page_size (int): The number of items per page

    Returns:
    Tuple[int, int]: A tuple of the start and end index
    """
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)


class Server:
    """
    Server class to paginate a database of popular baby names.

    Attributes:
        DATA_FILE (str): The path to the dataset file

    Methods:
        dataset(self) -> List[List]: Cached dataset
        get_page(self, page: int = 1, page_size: int = 10)
                -> List[List]: Get a page of the dataset
        get_hyper(self, page: int = 1, page_size: int = 10)
                -> Dict[str, Any]: Get a dictionary with hypermedia info
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        Cached and loaded the dataset

        Returns:
            List[List]: The dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Returns the proper page of the dataset

        Parameters:
            page (int): The page number
            page_size (int): The number of items per page

        Returns:
            List[List]: The dataset page
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start_index, end_index = index_range(page, page_size)
        return self.dataset()[start_index:end_index]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """
        Returns a dictionary with hypermedia info

        Parameters:
            page (int): The page number
            page_size (int): The number of items per page

        Returns:
            Dict[str, Any]: A dictionary with hypermedia info
        """
        data = self.get_page(page, page_size)
        total_items = len(self.dataset())
        total_pages = math.ceil(len(self.dataset()) / page_size)

        return {
            "page_size": len(data),
            "page": page,
            "data": data,
            "next_page": page + 1 if page + 1 <= total_pages else None,
            "prev_page": page - 1 if page > 1 else None,
            "total_pages": total_pages
        }