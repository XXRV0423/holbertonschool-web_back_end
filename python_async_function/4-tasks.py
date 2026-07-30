#!/usr/bin/env python3
"""Module that defines an asynchronous task_wait_n routine."""
import asyncio
from typing import List

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """Spawn task_wait_random n times and return delays in ascending order."""
    delays: List[float] = [
        await task for task in asyncio.as_completed(
            [task_wait_random(max_delay) for _ in range(n)]
        )
    ]
    return delays
