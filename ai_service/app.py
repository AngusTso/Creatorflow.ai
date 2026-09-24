import os
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel
import json

tools = [
    {
        "type": "function",
        "function": {
            "name": "calculate_quote",
            "description": "Calculate the total quote for a creator project.",
            "parameters": {
                "type": "object",
                "properties": {
                    "hours": {
                        "type": "number",
                        "description": "Number of hours of work"
                    },
                    "hourly_rate": {
                        "type": "number",
                        "description": "Hourly rate"
                    }
                },
                "required": ["hours", "hourly_rate"]
            }
        }
    }
]

class ScriptAnalysis(BaseModel):
    summary: str
    tone: str
    emotion: str
    vocal_difficulty: str
    voice_direction: str
    dynamic: str

load_dotenv()

if not os.getenv("OPENROUTER_API_KEY"):
    raise RuntimeError("OPENROUTER_API_KEY is not set")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

# nvidia/nemotron-3-embed-1b:free
def create_embedding(text):
    response = client.embeddings.create(
        model="liquid/lfm-2.5-embedding-350m:free",
        input=text
    )

    return response.data[0].embedding

def ask_llm(system_prompt, user_prompt):
    response = client.chat.completions.create(
        model="openrouter/free",
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )

    return response.choices[0].message.content

question = "How much would 10 hours of work cost at $500 per hour?"

messages = [
    {
        "role": "system",
        "content": """
You are a creator project assistant.

When the user asks for a project quote,
use the calculate_quote tool instead of calculating
the quote yourself.
"""
    },
    {
        "role": "user",
        "content": question
    }
]

script = """
I don't want you,you are not my type!I only into white man
"""

def calculate_quote(hours, hourly_rate):
    if hours <= 0:
        raise ValueError("Hours must be positive")

    if hourly_rate <= 0:
        raise ValueError("Hourly rate must be positive")

    if hours > 1000:
        raise ValueError("Project exceeds maximum allowed hours")
    
    return hours * hourly_rate

def get_upcoming_projects():
    return [
        {"name": "Anime Promo", "deadline": "2026-10-02"},
        {"name": "Game Trailer", "deadline": "2026-10-08"}
    ]

available_tools = {
    "calculate_quote": calculate_quote,
    "get_upcoming_projects": get_upcoming_projects
}

response = client.chat.completions.create(
    model="openrouter/free",
    messages=messages,
    tools=tools
)

message = response.choices[0].message
messages.append(message)

print("Content:", message.content)
print("Tool calls:", message.tool_calls)

tool_call = message.tool_calls[0]

print("Tool name:", tool_call.function.name)
print("Arguments:", tool_call.function.arguments)

arguments = json.loads(tool_call.function.arguments)
if tool_call.function.name not in available_tools:
    raise TypeError("No avaliable Tool")

result = calculate_quote(arguments["hours"], arguments["hourly_rate"])

messages.append({
    "role": "tool",
    "tool_call_id": tool_call.id,
    "content": str(result)
})

final_response = client.chat.completions.create(
    model="openrouter/free",
    messages=messages,
    tools=tools
)

print(final_response)
# word_count = len(script.split())
# try:
#     response = client.chat.completions.parse(
#         model="openrouter/free",
#         messages=[
#             {
#                 "role": "system",
#                 "content": """
#     You are a professional voice-acting script analyzer.

#     Be concise and only focus on this five categories

#     Analyze the script and identify:
#     - summary
#     - tone
#     - needed emotion
#     - vocal difficulty
#     - voice_direction (age, sex, voice qualities)
#     - dynamic (what scene this is)

#     """
#             },
#             {
#                 "role": "user",
#                 "content": f"""
#     Analyze this script:

#     {script}
#     """
#             }
#         ],
#         response_format=ScriptAnalysis,
#     )

#     analysis = response.choices[0].message.parsed

# except Exception as e:
#     analysis = ScriptAnalysis()
#     print(f"AI request failed: {e}")

# if not analysis.summary.strip():
#     raise ValueError("AI returned an empty summary")

# if not analysis.tone.strip():
#     raise ValueError("AI returned an empty tone")

# if not analysis.emotion.strip():
#     raise ValueError("AI returned an empty emotion")

# if not analysis.vocal_difficulty.strip():
#     raise ValueError("AI returned an empty vocal difficulty")

# if not analysis.voice_direction.strip():
#     raise ValueError("AI returned an empty voice_direction")

# if not analysis.dynamic.strip():
#     raise ValueError("AI returned an empty dynamic")

# print(analysis.tone)
# print(analysis.emotion)

# print(f"""
# Word count:  {word_count}

# AI analysis:
# tone: {analysis.tone}
# emotion: {analysis.emotion}
# vocal_difficulty: {analysis.vocal_difficulty}
# voice_direction: {analysis.voice_direction}
# dynamic: {analysis.dynamic}
# """)
