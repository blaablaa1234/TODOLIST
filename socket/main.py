import asyncio
import aiohttp
import websockets
import random
import json

# Async function to fetch a random to-do from the API
async def fetch_todo():
    todo_id = random.randint(1, 100)
    url = f"https://jsonplaceholder.typicode.com/todos/{todo_id}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                return await response.json()
            else:
                print(f"Failed to fetch todo with ID {todo_id}")
                return None

# WebSocket handler to send fetched to-dos to clients
async def send_todos(websocket):
    try:
        while True:
            todo = await fetch_todo()
            if todo:
                await websocket.send(json.dumps(todo))
            await asyncio.sleep(3)
    except websockets.ConnectionClosed:
        print("Client disconnected.")

# Start WebSocket server
async def main():
    async with websockets.serve(send_todos, "localhost", 5555):
        print("WebSocket server started on ws://localhost:5555")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())