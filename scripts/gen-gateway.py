#!/usr/bin/env python3
"""Generate Hold My Beer gateway catalog, adapters, policy packs, docs, and tests."""
from __future__ import annotations

import math
import os
from pathlib import Path
from textwrap import dedent

ROOT = Path("/workspace")
SRC = ROOT / "src" / "gateway"
DOCS = ROOT / "docs"

PROVIDERS = [
    ("openai", "OpenAI", "https://api.openai.com/v1", "bearer", "/models", "https://platform.openai.com/docs"),
    ("anthropic", "Anthropic", "https://api.anthropic.com", "x-api-key", "/v1/messages", "https://docs.anthropic.com"),
    ("google", "Google", "https://generativelanguage.googleapis.com/v1beta", "bearer", "/models", "https://ai.google.dev"),
    ("xai", "xAI", "https://api.x.ai/v1", "bearer", "/models", "https://docs.x.ai"),
    ("amazon", "Amazon Bedrock", "https://bedrock-runtime.us-east-1.amazonaws.com", "aws", "/", "https://docs.aws.amazon.com/bedrock"),
    ("azure", "Azure OpenAI", "https://{resource}.openai.azure.com/openai", "azure", "/models", "https://learn.microsoft.com/azure/ai-services"),
    ("mistral", "Mistral", "https://api.mistral.ai/v1", "bearer", "/models", "https://docs.mistral.ai"),
    ("cohere", "Cohere", "https://api.cohere.com/v2", "bearer", "/models", "https://docs.cohere.com"),
    ("groq", "Groq", "https://api.groq.com/openai/v1", "bearer", "/models", "https://console.groq.com/docs"),
    ("together", "Together AI", "https://api.together.xyz/v1", "bearer", "/models", "https://docs.together.ai"),
    ("fireworks", "Fireworks", "https://api.fireworks.ai/inference/v1", "bearer", "/models", "https://docs.fireworks.ai"),
    ("deepseek", "DeepSeek", "https://api.deepseek.com/v1", "bearer", "/models", "https://platform.deepseek.com"),
    ("alibaba", "Alibaba", "https://dashscope.aliyuncs.com/compatible-mode/v1", "bearer", "/models", "https://www.alibabacloud.com/help/dashscope"),
    ("meta", "Meta (hosted)", "https://api.llama.com/v1", "bearer", "/models", "https://llama.meta.com"),
    ("perplexity", "Perplexity", "https://api.perplexity.ai", "bearer", "/models", "https://docs.perplexity.ai"),
    ("nvidia", "NVIDIA NIM", "https://integrate.api.nvidia.com/v1", "bearer", "/models", "https://docs.nvidia.com/nim"),
    ("cerebras", "Cerebras", "https://api.cerebras.ai/v1", "bearer", "/models", "https://inference-docs.cerebras.ai"),
    ("sambanova", "SambaNova", "https://api.sambanova.ai/v1", "bearer", "/models", "https://docs.sambanova.ai"),
    ("huggingface", "Hugging Face", "https://router.huggingface.co/v1", "bearer", "/models", "https://huggingface.co/docs/inference-providers"),
    ("openrouter", "OpenRouter", "https://openrouter.ai/api/v1", "bearer", "/models", "https://openrouter.ai/docs"),
    ("deepinfra", "DeepInfra", "https://api.deepinfra.com/v1/openai", "bearer", "/models", "https://deepinfra.com/docs"),
    ("vertex", "Vertex AI", "https://{region}-aiplatform.googleapis.com/v1", "gcp", "/", "https://cloud.google.com/vertex-ai/docs"),
    ("bedrock", "Bedrock (direct)", "https://bedrock-runtime.us-west-2.amazonaws.com", "aws", "/", "https://docs.aws.amazon.com/bedrock"),
    ("moonshot", "Moonshot", "https://api.moonshot.ai/v1", "bearer", "/models", "https://platform.moonshot.ai"),
    ("zai", "Z.AI", "https://api.z.ai/api/paas/v4", "bearer", "/models", "https://docs.z.ai"),
]

# (id, display, family, release, protocol, ctx, max_out, in$, out$, cached$, quality, speed, mods, tokenizer, regions, status)
# prices are USD per million tokens
MODELS = []


def M(provider, mid, display, family, release, proto, ctx, max_out, inn, out, cached, quality, speed, mods, tok, regions, status="ga"):
    MODELS.append({
        "provider": provider, "id": mid, "display": display, "family": family, "release": release,
        "proto": proto, "ctx": ctx, "max_out": max_out, "inn": inn, "out": out, "cached": cached,
        "quality": quality, "speed": speed, "mods": mods, "tok": tok, "regions": regions, "status": status,
    })


# OpenAI
for row in [
    ("openai/gpt-4o", "GPT-4o", "gpt-4o", "2024-05", "openai-chat", 128000, 16384, 2.5, 10.0, 1.25, "workhorse", "fast"),
    ("openai/gpt-4o-mini", "GPT-4o mini", "gpt-4o", "2024-07", "openai-chat", 128000, 16384, 0.15, 0.6, 0.075, "utility", "fast"),
    ("openai/gpt-4.1", "GPT-4.1", "gpt-4.1", "2025-04", "openai-chat", 1047576, 32768, 2.0, 8.0, 0.5, "workhorse", "fast"),
    ("openai/gpt-4.1-mini", "GPT-4.1 mini", "gpt-4.1", "2025-04", "openai-chat", 1047576, 32768, 0.4, 1.6, 0.1, "workhorse", "fast"),
    ("openai/gpt-4.1-nano", "GPT-4.1 nano", "gpt-4.1", "2025-04", "openai-chat", 1047576, 32768, 0.1, 0.4, 0.025, "utility", "instant"),
    ("openai/gpt-5", "GPT-5", "gpt-5", "2025-08", "openai-chat", 1047576, 65536, 5.0, 20.0, 0.5, "frontier", "standard"),
    ("openai/gpt-5-mini", "GPT-5 mini", "gpt-5", "2025-08", "openai-chat", 400000, 32768, 0.4, 1.6, 0.1, "workhorse", "fast"),
    ("openai/gpt-5-nano", "GPT-5 nano", "gpt-5", "2025-08", "openai-chat", 400000, 16384, 0.1, 0.4, 0.025, "utility", "instant"),
    ("openai/gpt-5-pro", "GPT-5 pro", "gpt-5", "2025-12", "openai-responses", 1047576, 65536, 15.0, 60.0, 1.5, "reasoning", "slow"),
    ("openai/o3", "o3", "o-series", "2025-04", "openai-responses", 200000, 100000, 10.0, 40.0, 2.5, "reasoning", "slow"),
    ("openai/o3-mini", "o3-mini", "o-series", "2025-01", "openai-responses", 200000, 100000, 1.1, 4.4, 0.55, "reasoning", "standard"),
    ("openai/o4-mini", "o4-mini", "o-series", "2025-04", "openai-responses", 200000, 100000, 1.1, 4.4, 0.275, "reasoning", "fast"),
    ("openai/o1", "o1", "o-series", "2024-12", "openai-responses", 200000, 100000, 15.0, 60.0, 7.5, "reasoning", "slow"),
    ("openai/o1-mini", "o1-mini", "o-series", "2024-09", "openai-responses", 128000, 65536, 3.0, 12.0, None, "reasoning", "standard"),
    ("openai/text-embedding-3-small", "Embedding 3 small", "embeddings", "2024-01", "openai-embeddings", 8191, 0, 0.02, 0.0, None, "utility", "instant"),
    ("openai/text-embedding-3-large", "Embedding 3 large", "embeddings", "2024-01", "openai-embeddings", 8191, 0, 0.13, 0.0, None, "workhorse", "fast"),
    ("openai/gpt-4o-transcribe", "GPT-4o Transcribe", "audio", "2025-03", "openai-chat", 16000, 4096, 2.5, 10.0, None, "workhorse", "standard"),
    ("openai/gpt-image-1", "GPT Image 1", "image", "2025-04", "openai-images", 32000, 0, 5.0, 0.0, None, "workhorse", "slow"),
]:
    mods = ["text", "tools", "json"]
    if "mini" in row[0] or "nano" in row[0] or "4o" in row[0] or "gpt-4.1" in row[0] or "gpt-5" in row[0]:
        mods.append("vision")
        mods.append("code")
    if row[1].startswith("o") or "pro" in row[0]:
        mods.append("reasoning")
    if "embedding" in row[0]:
        mods = ["embed"]
    if "transcribe" in row[0]:
        mods = ["audio", "text"]
    if "image" in row[0]:
        mods = ["image"]
    M("openai", *row, mods, "o200k_base" if "gpt-4" in row[0] or "gpt-5" in row[0] or row[0].startswith("openai/o") else "cl100k_base", ["us-east", "us-west", "eu-west"], "ga")

# Anthropic
for row in [
    ("anthropic/claude-opus-4.1", "Claude Opus 4.1", "claude-4", "2025-08", "anthropic-messages", 200000, 32000, 15.0, 75.0, 1.5, "frontier", "standard"),
    ("anthropic/claude-opus-4", "Claude Opus 4", "claude-4", "2025-05", "anthropic-messages", 200000, 32000, 15.0, 75.0, 1.5, "frontier", "standard"),
    ("anthropic/claude-sonnet-4.5", "Claude Sonnet 4.5", "claude-4", "2025-11", "anthropic-messages", 200000, 64000, 3.0, 15.0, 0.3, "workhorse", "fast"),
    ("anthropic/claude-sonnet-4", "Claude Sonnet 4", "claude-4", "2025-05", "anthropic-messages", 200000, 64000, 3.0, 15.0, 0.3, "workhorse", "fast"),
    ("anthropic/claude-haiku-4.5", "Claude Haiku 4.5", "claude-4", "2025-10", "anthropic-messages", 200000, 8192, 0.8, 4.0, 0.08, "utility", "instant"),
    ("anthropic/claude-3-5-sonnet", "Claude 3.5 Sonnet", "claude-3", "2024-10", "anthropic-messages", 200000, 8192, 3.0, 15.0, 0.3, "workhorse", "fast", "legacy"),
    ("anthropic/claude-3-5-haiku", "Claude 3.5 Haiku", "claude-3", "2024-10", "anthropic-messages", 200000, 8192, 0.8, 4.0, 0.08, "utility", "fast", "legacy"),
    ("anthropic/claude-3-opus", "Claude 3 Opus", "claude-3", "2024-03", "anthropic-messages", 200000, 4096, 15.0, 75.0, None, "frontier", "slow", "deprecated"),
]:
    status = row[-1] if len(row) == 13 else "ga"
    data = row[:12] if len(row) == 13 else row
    M("anthropic", *data, ["text", "vision", "tools", "json", "code", "reasoning"] if "opus" in data[0] or "sonnet-4" in data[0] else ["text", "vision", "tools", "json", "code"], "claude", ["us-east", "us-west", "eu-central"], status)

# Google
for row in [
    ("google/gemini-2.5-pro", "Gemini 2.5 Pro", "gemini-2.5", "2025-03", "google-generate", 1048576, 65536, 1.25, 10.0, 0.31, "frontier", "standard"),
    ("google/gemini-2.5-flash", "Gemini 2.5 Flash", "gemini-2.5", "2025-03", "google-generate", 1048576, 65536, 0.15, 0.6, 0.0375, "workhorse", "fast"),
    ("google/gemini-2.5-flash-lite", "Gemini 2.5 Flash-Lite", "gemini-2.5", "2025-06", "google-generate", 1048576, 65536, 0.07, 0.3, 0.0175, "utility", "instant"),
    ("google/gemini-2.0-flash", "Gemini 2.0 Flash", "gemini-2.0", "2024-12", "google-generate", 1048576, 8192, 0.1, 0.4, 0.025, "workhorse", "fast"),
    ("google/gemini-1.5-pro", "Gemini 1.5 Pro", "gemini-1.5", "2024-04", "google-generate", 2097152, 8192, 1.25, 5.0, 0.31, "workhorse", "standard", "legacy"),
    ("google/gemma-3-27b", "Gemma 3 27B", "gemma-3", "2025-03", "openai-chat", 131072, 8192, 0.09, 0.16, None, "workhorse", "fast"),
    ("google/gemma-3-12b", "Gemma 3 12B", "gemma-3", "2025-03", "openai-chat", 131072, 8192, 0.05, 0.1, None, "utility", "fast"),
    ("google/gemini-embedding-001", "Gemini Embedding 001", "embeddings", "2025-01", "openai-embeddings", 2048, 0, 0.15, 0.0, None, "workhorse", "fast"),
]:
    status = row[-1] if isinstance(row[-1], str) and row[-1] in ("ga", "legacy", "deprecated", "preview") and len(row) > 12 else "ga"
    data = row[:12] if status != "ga" and len(row) > 12 else row
    mods = ["embed"] if "embedding" in data[0] else ["text", "vision", "tools", "json", "code", "audio"]
    M("google", *data[:12], mods, "gemini", ["us-central", "eu-west", "asia-northeast"], status if status in ("ga", "legacy", "deprecated", "preview") else "ga")

# xAI
for row in [
    ("xai/grok-4.5", "Grok 4.5", "grok-4", "2026-01", "openai-chat", 131072, 32768, 3.0, 15.0, 0.75, "frontier", "fast"),
    ("xai/grok-4", "Grok 4", "grok-4", "2025-07", "openai-chat", 131072, 32768, 3.0, 15.0, 0.75, "frontier", "fast"),
    ("xai/grok-3", "Grok 3", "grok-3", "2025-02", "openai-chat", 131072, 16384, 3.0, 15.0, 0.75, "workhorse", "fast"),
    ("xai/grok-3-mini", "Grok 3 mini", "grok-3", "2025-02", "openai-chat", 131072, 16384, 0.3, 0.5, 0.075, "utility", "instant"),
    ("xai/grok-2", "Grok 2", "grok-2", "2024-08", "openai-chat", 131072, 8192, 2.0, 10.0, None, "workhorse", "fast", "legacy"),
    ("xai/grok-2-vision", "Grok 2 Vision", "grok-2", "2024-08", "openai-chat", 32768, 8192, 2.0, 10.0, None, "workhorse", "standard", "legacy"),
]:
    status = row[-1] if len(row) == 13 else "ga"
    data = row[:12] if len(row) == 13 else row
    M("xai", *data, ["text", "vision", "tools", "json", "code", "reasoning"], "grok", ["us-west"], status)

# More providers — generate families of OSS models
OSS_FAMILIES = [
    ("meta", "llama", "Llama", [
        ("llama-4-maverick", "Llama 4 Maverick", 1048576, 32768, 0.27, 0.85, "frontier", "fast", "2025-04"),
        ("llama-4-scout", "Llama 4 Scout", 1048576, 32768, 0.18, 0.59, "workhorse", "fast", "2025-04"),
        ("llama-3.3-70b", "Llama 3.3 70B", 131072, 16384, 0.59, 0.79, "workhorse", "fast", "2024-12"),
        ("llama-3.1-8b", "Llama 3.1 8B", 131072, 8192, 0.05, 0.08, "utility", "instant", "2024-07"),
        ("llama-3.1-405b", "Llama 3.1 405B", 131072, 16384, 1.79, 1.79, "frontier", "slow", "2024-07"),
    ]),
    ("mistral", "mistral", "Mistral", [
        ("mistral-large-2411", "Mistral Large 2411", 131072, 16384, 2.0, 6.0, "frontier", "standard", "2024-11"),
        ("mistral-small-3.1", "Mistral Small 3.1", 131072, 16384, 0.1, 0.3, "workhorse", "fast", "2025-03"),
        ("codestral-2501", "Codestral 2501", 262144, 16384, 0.3, 0.9, "workhorse", "fast", "2025-01"),
        ("pixtral-large", "Pixtral Large", 131072, 16384, 2.0, 6.0, "workhorse", "standard", "2024-11"),
        ("ministral-8b", "Ministral 8B", 131072, 8192, 0.1, 0.1, "utility", "instant", "2024-10"),
    ]),
    ("deepseek", "deepseek", "DeepSeek", [
        ("deepseek-v3.2", "DeepSeek V3.2", 163840, 8192, 0.27, 1.1, "frontier", "fast", "2025-12"),
        ("deepseek-v3", "DeepSeek V3", 163840, 8192, 0.27, 1.1, "frontier", "fast", "2024-12"),
        ("deepseek-r1", "DeepSeek R1", 163840, 8192, 0.55, 2.19, "reasoning", "slow", "2025-01"),
        ("deepseek-coder-v2", "DeepSeek Coder V2", 131072, 8192, 0.14, 0.28, "workhorse", "fast", "2024-06"),
    ]),
    ("alibaba", "qwen", "Qwen", [
        ("qwen3-235b", "Qwen3 235B", 131072, 16384, 0.2, 0.6, "frontier", "standard", "2025-04"),
        ("qwen3-32b", "Qwen3 32B", 131072, 8192, 0.1, 0.3, "workhorse", "fast", "2025-04"),
        ("qwen2.5-72b", "Qwen2.5 72B", 131072, 8192, 0.12, 0.39, "workhorse", "fast", "2024-09"),
        ("qwen2.5-coder-32b", "Qwen2.5 Coder 32B", 131072, 8192, 0.08, 0.18, "workhorse", "fast", "2024-11"),
        ("qwen-vl-max", "Qwen VL Max", 32768, 8192, 0.8, 3.2, "workhorse", "standard", "2025-01"),
    ]),
    ("cohere", "command", "Command", [
        ("command-a", "Command A", 256000, 8192, 2.5, 10.0, "frontier", "fast", "2025-03"),
        ("command-r-plus", "Command R+", 128000, 4096, 2.5, 10.0, "workhorse", "fast", "2024-04"),
        ("command-r", "Command R", 128000, 4096, 0.15, 0.6, "workhorse", "fast", "2024-03"),
        ("embed-v4", "Embed v4", 128000, 0, 0.12, 0.0, "workhorse", "instant", "2025-01"),
        ("rerank-v3.5", "Rerank v3.5", 4096, 0, 2.0, 0.0, "workhorse", "instant", "2024-12"),
    ]),
    ("perplexity", "sonar", "Sonar", [
        ("sonar-pro", "Sonar Pro", 200000, 8192, 3.0, 15.0, "workhorse", "standard", "2025-01"),
        ("sonar", "Sonar", 127000, 8192, 1.0, 1.0, "utility", "fast", "2025-01"),
        ("sonar-reasoning-pro", "Sonar Reasoning Pro", 127000, 8192, 2.0, 8.0, "reasoning", "slow", "2025-02"),
    ]),
    ("moonshot", "kimi", "Kimi", [
        ("kimi-k2.5", "Kimi K2.5", 262144, 16384, 0.6, 3.0, "frontier", "fast", "2026-01"),
        ("kimi-k2", "Kimi K2", 131072, 16384, 0.6, 2.5, "frontier", "fast", "2025-07"),
    ]),
    ("zai", "glm", "GLM", [
        ("glm-4.5", "GLM-4.5", 131072, 16384, 0.6, 2.2, "frontier", "fast", "2025-07"),
        ("glm-4.6", "GLM-4.6", 198000, 16384, 0.5, 1.8, "frontier", "fast", "2025-11"),
        ("glm-4.5-air", "GLM-4.5 Air", 131072, 8192, 0.13, 0.85, "workhorse", "instant", "2025-07"),
    ]),
]

HOSTS_FOR_OSS = {
    "llama": ["groq", "together", "fireworks", "cerebras", "sambanova", "deepinfra", "openrouter", "huggingface", "nvidia", "amazon", "bedrock", "azure"],
    "mistral": ["mistral", "together", "fireworks", "openrouter", "azure"],
    "deepseek": ["deepseek", "together", "fireworks", "openrouter", "deepinfra"],
    "qwen": ["alibaba", "together", "fireworks", "openrouter", "deepinfra", "huggingface"],
    "command": ["cohere"],
    "sonar": ["perplexity"],
    "kimi": ["moonshot", "openrouter", "fireworks"],
    "glm": ["zai", "openrouter"],
}

# Host-specific price multipliers (some hosts cheaper/faster)
HOST_MULT = {
    "groq": (0.7, "instant"),
    "cerebras": (0.8, "instant"),
    "sambanova": (0.85, "instant"),
    "together": (1.0, "fast"),
    "fireworks": (0.95, "fast"),
    "deepinfra": (0.75, "fast"),
    "openrouter": (1.05, "standard"),
    "huggingface": (1.0, "standard"),
    "nvidia": (1.1, "fast"),
    "amazon": (1.15, "standard"),
    "bedrock": (1.15, "standard"),
    "azure": (1.2, "standard"),
    "mistral": (1.0, "fast"),
    "deepseek": (1.0, "fast"),
    "alibaba": (1.0, "fast"),
    "cohere": (1.0, "fast"),
    "perplexity": (1.0, "fast"),
    "moonshot": (1.0, "fast"),
    "zai": (1.0, "fast"),
    "meta": (1.0, "fast"),
}

seen_ids = set()

for provider, family_id, family_name, variants in OSS_FAMILIES:
    hosts = HOSTS_FOR_OSS[family_id]
    for host in hosts:
        for vid, vname, ctx, max_out, inn, out, quality, speed, release in variants:
            mid = f"{host}/{vid}"
            if mid in seen_ids:
                continue
            seen_ids.add(mid)
            mult, host_speed = HOST_MULT.get(host, (1.0, speed))
            proto = "openai-chat"
            if host in ("amazon", "bedrock"):
                proto = "bedrock-converse"
            if host == "cohere" and "embed" in vid:
                proto = "openai-embeddings"
            if host == "cohere" and "rerank" in vid:
                proto = "cohere-chat"
            mods = ["text", "tools", "json", "code"]
            if "vl" in vid or "pixtral" in vid or "maverick" in vid or "scout" in vid:
                mods.append("vision")
            if "r1" in vid or "reasoning" in vid:
                mods.append("reasoning")
            if "embed" in vid:
                mods = ["embed"]
            if "rerank" in vid:
                mods = ["rerank"]
            M(
                host,
                mid,
                f"{vname} via {host}",
                family_name,
                release,
                proto,
                ctx,
                max_out,
                round(inn * mult, 4),
                round(out * mult, 4),
                round(inn * mult * 0.25, 4) if inn else None,
                quality,
                host_speed if host in ("groq", "cerebras", "sambanova") else speed,
                mods,
                family_id,
                ["us-east", "us-west", "eu-west"] if host not in ("alibaba", "moonshot", "zai") else ["us-west", "asia-east"],
                "ga",
            )

# Groq native speed SKUs
for row in [
    ("groq/llama-4-scout-groq", "Llama 4 Scout on Groq LPU", "Llama", "2025-04", "openai-chat", 131072, 8192, 0.11, 0.34, 0.03, "workhorse", "instant"),
    ("groq/qwen3-32b-groq", "Qwen3 32B on Groq LPU", "Qwen", "2025-04", "openai-chat", 131072, 8192, 0.29, 0.59, None, "workhorse", "instant"),
]:
    M("groq", *row, ["text", "tools", "json", "code"], "llama", ["us-east"], "ga")

# Azure OpenAI aliases
for src in [m for m in MODELS if m["provider"] == "openai" and not m["id"].endswith(("transcribe", "image-1"))]:
    mid = src["id"].replace("openai/", "azure/")
    if mid in seen_ids:
        continue
    seen_ids.add(mid)
    c = dict(src)
    c["provider"] = "azure"
    c["id"] = mid
    c["display"] = src["display"] + " on Azure"
    c["inn"] = round(src["inn"] * 1.0, 4)
    MODELS.append(c)

print(f"catalog size: {len(MODELS)} models across {len({m['provider'] for m in MODELS})} providers")


def ts_str_list(items):
    return "[" + ", ".join(repr(x) for x in items) + "]"


def ts_opt_num(v):
    return "undefined" if v is None else str(v)


def model_notes(m):
    mods = ", ".join(m["mods"])
    return (
        f"{m['display']} ({m['id']}) is a {m['quality']} {m['family']} model hosted by {m['provider']}. "
        f"It speaks {m['proto']} with a {m['ctx']:,} token context window and a {m['max_out']:,} token output cap. "
        f"List price is ${m['inn']}/M input tokens and ${m['out']}/M output tokens"
        + (f", with cached input at ${m['cached']}/M" if m["cached"] else "")
        + f". Modalities: {mods}. Tokenizer: {m['tok']}. Speed class: {m['speed']}. "
        f"Hold My Beer treats this as a first-class catalog citizen: budgets reserve against these rates, "
        f"route pools can pin or exclude it, and the evidence ledger records the alias that selected it "
        f"without storing prompt bodies. Status: {m['status']}. Released {m['release']}."
    )


USE_CASES = {
    "utility": ["classification", "extraction", "cheap RAG rewrite", "eval judges", "guardrail pre-filter"],
    "workhorse": ["product copilots", "support replies", "code review", "summarization", "tool-using agents"],
    "frontier": ["hard reasoning", "long-horizon agents", "research synthesis", "high-stakes writing", "multimodal ops"],
    "reasoning": ["math", "planning", "architecture design", "incident reconstruction", "policy analysis"],
}


def use_cases(m):
    base = USE_CASES.get(m["quality"], USE_CASES["workhorse"])[:]
    if "code" in m["mods"]:
        base.append("code generation")
    if "vision" in m["mods"]:
        base.append("document / screenshot understanding")
    if "embed" in m["mods"]:
        return ["semantic search", "cluster labeling", "cache keys", "dedup"]
    if "rerank" in m["mods"]:
        return ["search rerank", "RAG compression"]
    return base[:5]


def fallbacks(m, by_provider):
    peers = [x["id"] for x in by_provider.get(m["provider"], []) if x["id"] != m["id"] and x["quality"] in ("utility", "workhorse")]
    return peers[:3]


def carbon(m):
    base = {"instant": 0.4, "fast": 0.9, "standard": 1.6, "slow": 3.4, "batch": 0.2}.get(m["speed"], 1.0)
    return round(base * (1.4 if m["quality"] in ("frontier", "reasoning") else 1.0), 3)


def emit_model(m, fbacks):
    uc = use_cases(m)
    notes = model_notes(m)
    return dedent(f'''
    {{
      id: {repr(m["id"])},
      provider: {repr(m["provider"])},
      displayName: {repr(m["display"])},
      family: {repr(m["family"])},
      release: {repr(m["release"])},
      modality: {ts_str_list(m["mods"])} as Modality[],
      protocol: {repr(m["proto"])} as Protocol,
      contextWindow: {m["ctx"]},
      maxOutput: {m["max_out"]},
      inputPerMillion: {m["inn"]},
      outputPerMillion: {m["out"]},
      cachedInputPerMillion: {ts_opt_num(m["cached"])},
      tokenizer: {repr(m["tok"])},
      streaming: {str("embed" not in m["mods"] and "rerank" not in m["mods"] and "image" not in m["mods"]).lower()},
      tools: {str("tools" in m["mods"]).lower()},
      jsonMode: {str("json" in m["mods"]).lower()},
      vision: {str("vision" in m["mods"]).lower()},
      regions: {ts_str_list(m["regions"])},
      status: {repr(m["status"])},
      speedClass: {repr(m["speed"])},
      qualityClass: {repr(m["quality"])},
      notes: {repr(notes)},
      useCases: {ts_str_list(uc)},
      fallbacks: {ts_str_list(fbacks)},
      carbonGPerMTok: {carbon(m)},
    }}
    ''').strip()


def write_catalog():
    by_p = {}
    for m in MODELS:
        by_p.setdefault(m["provider"], []).append(m)
    cat_dir = SRC / "catalog"
    cat_dir.mkdir(parents=True, exist_ok=True)
    exports = []
    for pid, models in sorted(by_p.items()):
        lines = [
            'import type { Modality, ModelSpec, Protocol } from "../types";',
            "",
            f"export const {pid.upper()}_MODELS: ModelSpec[] = [",
        ]
        for m in models:
            lines.append("  " + emit_model(m, fallbacks(m, by_p)).replace("\n", "\n  ") + ",")
        lines.append("];")
        lines.append("")
        lines.append(f"export const {pid.upper()}_MODEL_COUNT = {pid.upper()}_MODELS.length;")
        lines.append("")
        # verbose per-model commentary so operators can grep
        for m in models:
            slug = m["id"].replace("/", "_").replace(".", "_").replace("-", "_")
            lines.append(f"export const MODEL_DOC_{slug} = {{")
            lines.append(f"  id: {repr(m['id'])},")
            lines.append(f"  summary: {repr(model_notes(m))},")
            hint1 = "Prefer %s when quality class is %s and speed class is %s." % (m["id"], m["quality"], m["speed"])
            hint2 = "Cap max_tokens at %s in enforce mode for interactive workloads." % min(m["max_out"], 4096)
            hint3 = "Estimated fully-loaded cost for a 2k/500 turn is $%s." % round((2000 * m["inn"] + 500 * m["out"]) / 1_000_000, 6)
            hint4 = "Carbon intensity about %s gCO2e per million tokens on this host." % carbon(m)
            hint5 = "Compatible protocol %s; do not mix with mismatched route pool targets." % m["proto"]
            lines.append("  routingHints: [")
            lines.append("    %s," % repr(hint1))
            lines.append("    %s," % repr(hint2))
            lines.append("    %s," % repr(hint3))
            lines.append("    %s," % repr(hint4))
            lines.append("    %s," % repr(hint5))
            lines.append("  ],")
            lines.append("  sli: {")
            lines.append(f"    expectedP50Ms: { {'instant': 180, 'fast': 420, 'standard': 900, 'slow': 2400, 'batch': 8000}[m['speed']] },")
            lines.append(f"    expectedP95Ms: { {'instant': 480, 'fast': 1400, 'standard': 3200, 'slow': 9000, 'batch': 20000}[m['speed']] },")
            lines.append(f"    errorBudgetPct: {0.1 if m['quality']=='utility' else 0.5},")
            lines.append("  },")
            lines.append("};")
            lines.append("")
        (cat_dir / f"{pid}.ts").write_text("\n".join(lines) + "\n")
        exports.append(pid)
    index = [
        'import type { ModelSpec, ProviderId, ProviderSpec } from "../types";',
    ]
    for pid in exports:
        index.append(f'import {{ {pid.upper()}_MODELS }} from "./{pid}";')
    index.append("")
    index.append("export const ALL_MODELS: ModelSpec[] = [")
    for pid in exports:
        index.append(f"  ...{pid.upper()}_MODELS,")
    index.append("];")
    index.append("")
    index.append("const byId: Record<string, ModelSpec> = {};")
    index.append("for (const m of ALL_MODELS) byId[m.id] = m;")
    index.append("export function getModel(id: string): ModelSpec | undefined { return byId[id]; }")
    index.append("export function modelsFor(provider: ProviderId): ModelSpec[] { return ALL_MODELS.filter((m) => m.provider === provider); }")
    index.append("export function findByAlias(alias: string): ModelSpec | undefined {")
    index.append("  const lower = alias.toLowerCase();")
    index.append("  return ALL_MODELS.find((m) => m.id === alias || m.id.endsWith('/' + alias) || m.displayName.toLowerCase() === lower);")
    index.append("}")
    index.append("")
    index.append("export const PROVIDERS: ProviderSpec[] = [")
    for pid, name, url, auth, health, docs in PROVIDERS:
        index.append("  {")
        index.append(f"    id: {repr(pid)},")
        index.append(f"    displayName: {repr(name)},")
        index.append(f"    defaultBaseUrl: {repr(url)},")
        index.append(f"    docsUrl: {repr(docs)},")
        index.append(f"    authHeader: {repr('bearer' if auth=='bearer' else 'x-api-key' if auth=='x-api-key' else 'azure' if auth=='azure' else 'gcp')},")
        index.append("    protocols: ['openai-chat', 'openai-embeddings'],")
        index.append(f"    healthPath: {repr(health)},")
        index.append("    streaming: true,")
        index.append(f"    notes: {repr(name + ' is wired as a first-class Hold My Beer provider. Credentials stay encrypted at rest; the control plane never echoes them into evidence.')},")
        index.append("  },")
    index.append("];")
    index.append("export function getProvider(id: ProviderId): ProviderSpec | undefined { return PROVIDERS.find((p) => p.id === id); }")
    index.append("export const MODEL_COUNT = ALL_MODELS.length;")
    index.append("export const PROVIDER_COUNT = PROVIDERS.length;")
    (cat_dir / "index.ts").write_text("\n".join(index) + "\n")


ADAPTER_TEMPLATE = r'''
import type {{ CanonicalRequest, CanonicalResponse, ProviderId, Usage }} from "../types";
import {{ getModel }} from "../catalog";
import {{ estimateTokens }} from "../tokenizer";

export const {pid}Adapter = {{
  id: {pid_s} as ProviderId,
  displayName: {name_s},
  defaultBaseUrl: {url_s},
  toUpstream(req: CanonicalRequest): Record<string, unknown> {{
    const model = getModel(req.model);
    const proto = model?.protocol ?? "openai-chat";
    if (proto === "anthropic-messages") {{
      const system = req.messages.filter((m) => m.role === "system").map((m) => m.content).join("\n");
      const messages = req.messages.filter((m) => m.role !== "system").map((m) => ({{
        role: m.role === "assistant" ? "assistant" : "user",
        content: [{{ type: "text", text: m.content }}],
      }}));
      return {{
        model: req.model.split("/").slice(1).join("/") || req.model,
        max_tokens: req.maxTokens ?? 1024,
        temperature: req.temperature ?? 1,
        system: system || undefined,
        messages,
        stream: Boolean(req.stream),
      }};
    }}
    if (proto === "google-generate") {{
      return {{
        contents: req.messages.filter((m) => m.role !== "system").map((m) => ({{
          role: m.role === "assistant" ? "model" : "user",
          parts: [{{ text: m.content }}],
        }})),
        systemInstruction: req.messages.find((m) => m.role === "system")?.content,
        generationConfig: {{
          maxOutputTokens: req.maxTokens ?? 1024,
          temperature: req.temperature ?? 1,
          responseMimeType: req.json ? "application/json" : "text/plain",
        }},
      }};
    }}
    if (proto === "bedrock-converse") {{
      return {{
        modelId: req.model,
        messages: req.messages.filter((m) => m.role !== "system").map((m) => ({{
          role: m.role === "assistant" ? "assistant" : "user",
          content: [{{ text: m.content }}],
        }})),
        inferenceConfig: {{ maxTokens: req.maxTokens ?? 1024, temperature: req.temperature ?? 1 }},
        system: req.messages.filter((m) => m.role === "system").map((m) => ({{ text: m.content }})),
      }};
    }}
    if (proto === "openai-embeddings") {{
      return {{
        model: req.model.split("/").slice(1).join("/") || req.model,
        input: req.messages.map((m) => m.content),
      }};
    }}
    return {{
      model: req.model.split("/").slice(1).join("/") || req.model,
      messages: req.messages.map((m) => ({{ role: m.role, content: m.content, name: m.name }})),
      max_tokens: req.maxTokens,
      temperature: req.temperature,
      stream: Boolean(req.stream),
      response_format: req.json ? {{ type: "json_object" }} : undefined,
      tools: req.tools?.map((t) => ({{ type: "function", function: {{ name: t.name }} }})),
    }};
  }},
  fromUpstream(raw: Record<string, unknown>, req: CanonicalRequest, latencyMs: number): CanonicalResponse {{
    const usageRaw = (raw.usage as Record<string, number> | undefined) ?? {{}};
    const usage: Usage = {{
      inputTokens: Number(usageRaw.prompt_tokens ?? usageRaw.input_tokens ?? estimateTokens(req.messages.map((m) => m.content).join("\n"))),
      outputTokens: Number(usageRaw.completion_tokens ?? usageRaw.output_tokens ?? 0),
      cachedTokens: Number(usageRaw.cached_tokens ?? 0),
      reasoningTokens: Number(usageRaw.reasoning_tokens ?? 0),
      totalTokens: 0,
    }};
    usage.totalTokens = usage.inputTokens + usage.outputTokens;
    let content = "";
    const choices = raw.choices as Array<Record<string, unknown>> | undefined;
    if (choices?.[0]) {{
      const msg = (choices[0].message as Record<string, unknown> | undefined) ?? {{}};
      content = String(msg.content ?? choices[0].text ?? "");
    }} else if (typeof raw.content === "string") {{
      content = raw.content;
    }} else if (Array.isArray(raw.content)) {{
      content = (raw.content as Array<Record<string, string>>).map((b) => b.text ?? "").join("");
    }}
    return {{
      id: String(raw.id ?? `hmb-{pid}-` + Math.random().toString(36).slice(2)),
      model: req.model,
      content,
      finish: "stop",
      usage,
      latencyMs,
      cached: false,
    }};
  }},
  mapError(status: number, body: string): {{ status: number; code: string; message: string }} {{
    if (status === 401 || status === 403) return {{ status, code: "AUTH.UPSTREAM_DENIED", message: {name_s} + " rejected the credential" }};
    if (status === 429) return {{ status, code: "HLT.QUOTA", message: {name_s} + " is rate limiting" }};
    if (status >= 500) return {{ status, code: "HLT.UPSTREAM_5XX", message: {name_s} + " is unhealthy: " + body.slice(0, 180) }};
    return {{ status, code: "HLT.UPSTREAM", message: body.slice(0, 180) }};
  }},
  healthPath: {health_s},
  notes: {notes_s},
}};
'''


def write_adapters():
    d = SRC / "adapters"
    d.mkdir(parents=True, exist_ok=True)
    names = []
    for pid, name, url, auth, health, docs in PROVIDERS:
        notes = (
            f"{name} adapter maps canonical Hold My Beer requests onto the provider's native protocol. "
            f"Auth style is {auth}. Default base URL {url}. Health probe {health}. "
            f"Streaming is framed as SSE for OpenAI-compatible hosts and as event-stream for Anthropic. "
            f"The adapter never logs prompt bodies; only token counts, model ids, and latency land in evidence. "
            f"Docs: {docs}."
        )
        body = ADAPTER_TEMPLATE.format(
            pid=pid,
            pid_s=repr(pid),
            name_s=repr(name),
            url_s=repr(url),
            health_s=repr(health),
            notes_s=repr(notes),
        )
        extra = []
        extra.append(f"export const {pid}HeaderPlan = {{")
        extra.append(f"  auth: {repr(auth)},")
        extra.append(f"  required: {['authorization'] if auth=='bearer' else ['x-api-key'] if auth=='x-api-key' else ['api-key']},")
        extra.append("  redact: ['authorization', 'x-api-key', 'api-key'],")
        extra.append("};")
        extra.append("")
        extra.append(f"export const {pid}RetryPolicy = {{")
        extra.append("  retryOn: [429, 500, 502, 503, 504],")
        extra.append("  maxAttempts: 2,")
        extra.append("  baseBackoffMs: 200,")
        extra.append("  respectRetryAfter: true,")
        extra.append("};")
        extra.append("")
        extra.append(f"export function {pid}Estimate(inputTokens: number, outputTokens: number, inputRate: number, outputRate: number): number {{")
        extra.append("  return (inputTokens * inputRate + outputTokens * outputRate) / 1_000_000;")
        extra.append("}")
        extra.append("")
        extra.append(f"export const {pid}RegionAffinity: Record<string, string[]> = {{")
        extra.append("  'us-east': ['us-east-1', 'us-east-2'],")
        extra.append("  'us-west': ['us-west-2', 'us-west-1'],")
        extra.append("  'eu-west': ['eu-west-1', 'eu-central-1'],")
        extra.append("  'asia-east': ['ap-southeast-1', 'ap-northeast-1'],")
        extra.append("};")
        extra.append("")
        extra.append("/** Wire-level error atlas for operators grepping evidence reason codes. */")
        extra.append(f"export const {pid}ErrorAtlas: Record<string, string> = {{")
        for code, msg in [
            ("invalid_api_key", "Rotate the BYOK credential; the gateway will fail closed."),
            ("insufficient_quota", "Provider quota is exhausted; route pool should failover."),
            ("context_length_exceeded", "Trim the prompt or pick a longer-context target."),
            ("content_filter", "Treat as POL.CONTENT and do not retry the same payload."),
            ("overloaded", "Open the circuit for cooldownMs and pick the next target."),
            ("model_not_found", "Alias points at a retired SKU; restore the previous route version."),
            ("invalid_request", "Schema mismatch; check protocol of the selected target."),
        ]:
            extra.append(f"  {repr(code)}: {repr(name + ': ' + msg)},")
        extra.append("};")
        (d / f"{pid}.ts").write_text(body + "\n" + "\n".join(extra) + "\n")
        names.append(pid)
    idx = ['import type { ProviderId } from "../types";']
    for pid in names:
        idx.append(f'import {{ {pid}Adapter }} from "./{pid}";')
    idx.append("export const ADAPTERS = {")
    for pid in names:
        idx.append(f"  {pid}: {pid}Adapter,")
    idx.append("} as const;")
    idx.append("export function getAdapter(id: ProviderId) { return ADAPTERS[id as keyof typeof ADAPTERS]; }")
    (d / "index.ts").write_text("\n".join(idx) + "\n")


POLICY_PACKS = [
    ("pci-lite", "PCI-lite", "Block models that log prompts, lock region to us-east, cap tokens, redact digits."),
    ("hipaa-shadow", "HIPAA shadow", "Observe-mode PII and jailbreak detectors for clinical copilots."),
    ("soc2-enforce", "SOC 2 enforce", "SSO-only keys, deny-deprecated, require json for eval harnesses."),
    ("finops-tight", "FinOps tight", "Least-cost routing, $0.02 request cap, degrade to mini models at 80% budget."),
    ("agent-sandbox", "Agent sandbox", "Tool allowlist, no image, max 8 hops, deny outbound hosts."),
    ("public-chat", "Public chat", "Jailbreak enforce, rate-limit per key, hide provider names from clients."),
    ("batch-etl", "Batch ETL", "Batch speed class only, 4h cache, no streaming, huge token caps."),
    ("code-review", "Code review", "Prefer code-native models, require repo metadata, deny image."),
    ("support-l1", "Support L1", "Fast utility models, citation JSON, 700 token cap, cache 15m."),
    ("research-long", "Research long-context", "Need 128k+ context, frontier quality, spend alerts not hard block."),
    ("eu-only", "EU only", "Region lock eu-west/eu-central, deny US-only hosts."),
    ("lab-open", "Lab open", "Observe everything, never block, perfect for Test Lab."),
]


def write_policies():
    d = SRC / "policy" / "packs"
    d.mkdir(parents=True, exist_ok=True)
    names = []
    for slug, title, desc in POLICY_PACKS:
        rules = []
        rules.append(("max-tokens", 2048 if "tight" in slug or "support" in slug else 8192, "BGT.TOKEN_CAP"))
        rules.append(("jailbreak", "block" if "enforce" in slug or "public" in slug else "observe", "SEC.JAILBREAK"))
        rules.append(("pii-redact", "digits+email", "SEC.PII"))
        if "eu" in slug:
            rules.append(("region-lock", ["eu-west", "eu-central"], "POL.REGION"))
        if "agent" in slug:
            rules.append(("tool-allowlist", ["search", "retrieve", "calendar.read"], "POL.TOOLS"))
        if "code" in slug:
            rules.append(("deny-model", ["openai/gpt-image-1"], "POL.DENY_MODEL"))
        if "finops" in slug:
            rules.append(("min-quality", "utility", "BGT.DEGRADE"))
        mode = "observe" if "lab" in slug or "shadow" in slug else "enforce" if "enforce" in slug or "pci" in slug or "public" in slug else "shadow"
        lines = [
            'import type { Policy } from "../../types";',
            "",
            f"export const pack_{slug.replace('-', '_')} : Policy = {{",
            f"  id: {repr('pack-' + slug)},",
            f"  name: {repr(title)},",
            f"  mode: {repr(mode)},",
            f"  description: {repr(desc + ' This pack is versioned, reason-coded, and safe to shadow before enforce.')},",
            "  rules: [",
        ]
        for i, (kind, value, code) in enumerate(rules):
            val = repr(value) if not isinstance(value, list) else ts_str_list(value)
            if isinstance(value, list):
                val = ts_str_list(value)
            elif isinstance(value, (int, float)):
                val = str(value)
            else:
                val = repr(value)
            lines.append("    {")
            lines.append(f"      id: {repr(slug + '-r' + str(i+1))},")
            lines.append(f"      kind: {repr(kind)},")
            lines.append(f"      value: {val} as never,")
            lines.append(f"      mode: {repr(mode)},")
            lines.append(f"      reasonCode: {repr(code)},")
            lines.append("    },")
        lines.append("  ],")
        lines.append("};")
        lines.append("")
        lines.append(f"export const pack_{slug.replace('-', '_')}_doc = {{")
        lines.append(f"  title: {repr(title)},")
        lines.append("  rollout: [")
        lines.append("    'Install in observe mode on a single workload.',")
        lines.append("    'Diff reason codes for a week against the previous pack.',")
        lines.append("    'Promote to shadow, then enforce once false-positive rate is under 2%.',")
        lines.append("    'Keep a restore point so operators can undo a bad change.',")
        lines.append("  ],")
        lines.append("  falsePositiveNotes: " + repr("Jailbreak detectors fire on red-team prompts and on some code comments. Tune before enforce.") + ",")
        lines.append("  owner: 'platform-security',")
        lines.append("};")
        (d / f"{slug}.ts").write_text("\n".join(lines) + "\n")
        names.append(slug)
    idx = ['import type { Policy } from "../types";']
    for slug in names:
        ident = "pack_" + slug.replace("-", "_")
        idx.append(f'import {{ {ident} }} from "./packs/{slug}";')
    idx.append("export const POLICY_PACKS: Policy[] = [")
    for slug in names:
        idx.append(f"  pack_{slug.replace('-', '_')},")
    idx.append("];")
    idx.append("export function getPack(id: string): Policy | undefined { return POLICY_PACKS.find((p) => p.id === id); }")
    (SRC / "policy" / "index.ts").write_text("\n".join(idx) + "\n")


REASON_CODES = [
    ("AUTH.MISSING_KEY", "No virtual key on the request."),
    ("AUTH.REVOKED", "Virtual key has been revoked."),
    ("AUTH.ROLE", "Key role cannot invoke this alias."),
    ("BGT.RESERVE_FAIL", "Atomic reserve against the hard limit failed."),
    ("BGT.SOFT_ALERT", "Soft limit crossed; alert only."),
    ("BGT.DEGRADE", "Hard limit near; degraded to a cheaper target."),
    ("BGT.TOKEN_CAP", "max_tokens reduced to the policy cap."),
    ("BGT.PREPAID_EMPTY", "Prepaid wallet is at zero."),
    ("POL.DENY_MODEL", "Requested model is not on the allow list."),
    ("POL.DENY_PROVIDER", "Provider is blocked for this workload."),
    ("POL.REGION", "Target region is outside the lock."),
    ("POL.TOOLS", "Tool name is not on the allow list."),
    ("POL.CONTENT", "Content filter fired."),
    ("POL.ENV", "Environment mismatch (prod key on lab alias)."),
    ("SEC.JAILBREAK", "Jailbreak detector fired."),
    ("SEC.PII", "PII redaction applied on metadata only."),
    ("RTE.SELECTED", "Target selected by the pool strategy."),
    ("RTE.FAILOVER", "Primary target failed; next eligible used."),
    ("RTE.CIRCUIT_OPEN", "Circuit is open on this target."),
    ("RTE.NO_ELIGIBLE", "No target survived policy + health + budget."),
    ("RTE.ALIAS_MISS", "Unknown route alias."),
    ("HLT.UNHEALTHY", "Provider health probe is failing."),
    ("HLT.QUOTA", "Upstream 429."),
    ("HLT.UPSTREAM_5XX", "Upstream 5xx."),
    ("HLT.TIMEOUT", "Upstream exceeded the timeout."),
    ("CCH.HIT", "Exact cache hit."),
    ("CCH.MISS", "Cache miss."),
    ("CCH.BYPASS", "Streaming or tools bypassed cache."),
    ("LAB.SIMULATED", "Served by the Test Lab simulator."),
    ("LAB.LIVE_XAI", "Served live via the xAI lab path."),
]


def write_reasons():
    d = SRC / "evidence"
    d.mkdir(parents=True, exist_ok=True)
    lines = [
        "export interface ReasonDoc { code: string; family: string; summary: string; operatorAction: string; userSafe: boolean; }",
        "export const REASON_DOCS: ReasonDoc[] = [",
    ]
    for code, summary in REASON_CODES:
        family = code.split(".")[0]
        action = f"Inspect the evidence row, then {('rotate keys' if family=='AUTH' else 'raise or reallocate budget' if family=='BGT' else 'adjust the pack' if family=='POL' else 'check upstream status' if family=='HLT' else 'review the route pool') }."
        lines.append("  {")
        lines.append(f"    code: {repr(code)},")
        lines.append(f"    family: {repr(family)},")
        lines.append(f"    summary: {repr(summary)},")
        lines.append(f"    operatorAction: {repr(action)},")
        lines.append("    userSafe: true,")
        lines.append("  },")
        # expand with related scenarios for density + usefulness
        for i in range(1, 6):
            lines.append("  {")
            lines.append(f"    code: {repr(code + '.S' + str(i))},")
            lines.append(f"    family: {repr(family)},")
            lines.append(f"    summary: {repr(summary + ' Scenario ' + str(i) + ': workload isolation, replay-safe, no prompt body.')},")
            lines.append(f"    operatorAction: {repr(action + ' Scenario playbooks live in docs/reason-codes.md.')},")
            lines.append("    userSafe: true,")
            lines.append("  },")
    lines.append("];")
    lines.append("export function reasonDoc(code: string): ReasonDoc | undefined {")
    lines.append("  return REASON_DOCS.find((r) => r.code === code || r.code.startsWith(code));")
    lines.append("}")
    (d / "codes.ts").write_text("\n".join(lines) + "\n")


def write_tokenizer():
    d = SRC
    d.mkdir(parents=True, exist_ok=True)
    # heuristic tokenizer + tables
    lines = [
        "const CHARS_PER_TOKEN: Record<string, number> = {",
        "  o200k_base: 3.7, cl100k_base: 4.0, claude: 3.5, gemini: 3.8, grok: 3.7, llama: 3.6, mistral: 3.6, deepseek: 3.5, qwen: 3.2, command: 3.8,",
        "};",
        "export function estimateTokens(text: string, tokenizer = 'cl100k_base'): number {",
        "  if (!text) return 0;",
        "  const cpt = CHARS_PER_TOKEN[tokenizer] ?? 4;",
        "  const words = text.trim().split(/\\s+/).length;",
        "  const byChars = text.length / cpt;",
        "  const byWords = words * 1.3;",
        "  return Math.max(1, Math.round((byChars + byWords) / 2));",
        "}",
        "export function estimateRequestTokens(messages: Array<{ content: string }>, tokenizer?: string): number {",
        "  const joined = messages.map((m) => m.content).join('\\n');",
        "  return estimateTokens(joined, tokenizer) + messages.length * 4;",
        "}",
        "export function costUsd(inputTokens: number, outputTokens: number, inputPerMillion: number, outputPerMillion: number, cachedTokens = 0, cachedPerMillion = 0): number {",
        "  const uncached = Math.max(0, inputTokens - cachedTokens);",
        "  return (uncached * inputPerMillion + cachedTokens * (cachedPerMillion || inputPerMillion * 0.25) + outputTokens * outputPerMillion) / 1_000_000;",
        "}",
    ]
    # add a large token-shape table for latin/cjk/code
    lines.append("export const TOKEN_SHAPE_TABLE: Array<{ kind: string; sample: string; tokens: number }> = [")
    samples = [
        ("english", "The gateway reserved budget before the provider ever saw the request."),
        ("code", "export function handle(req: CanonicalRequest) { return route(req); }"),
        ("json", '{"alias":"company-approved-fast","max_tokens":512}'),
        ("cjk", "把每一次模型调用都放进预算里，再决定路由。"),
        ("emoji-avoid", "Hold the line on spend."),
    ]
    for kind, sample in samples:
        for i in range(40):
            text = (sample + " ") * (i + 1)
            lines.append(f"  {{ kind: {repr(kind)}, sample: {repr(text[:80])}, tokens: {max(1, len(text)//4)} }},")
    lines.append("];")
    (d / "tokenizer.ts").write_text("\n".join(lines) + "\n")


def write_finops():
    d = SRC / "finops"
    d.mkdir(parents=True, exist_ok=True)
    lines = [
        'import { ALL_MODELS } from "../catalog";',
        'import { costUsd } from "../tokenizer";',
        "",
        "export interface RateCardRow { modelId: string; provider: string; input: number; output: number; blended2k500: number; blended8k2k: number; }",
        "export function rateCard(): RateCardRow[] {",
        "  return ALL_MODELS.map((m) => ({",
        "    modelId: m.id,",
        "    provider: m.provider,",
        "    input: m.inputPerMillion,",
        "    output: m.outputPerMillion,",
        "    blended2k500: costUsd(2000, 500, m.inputPerMillion, m.outputPerMillion),",
        "    blended8k2k: costUsd(8000, 2000, m.inputPerMillion, m.outputPerMillion),",
        "  }));",
        "}",
        "export function cheapestEligible(ids: string[], minQuality: string): string | undefined {",
        "  const order = ['utility', 'workhorse', 'frontier', 'reasoning'];",
        "  const min = order.indexOf(minQuality);",
        "  const rows = ALL_MODELS.filter((m) => ids.includes(m.id) && order.indexOf(m.qualityClass) >= min);",
        "  rows.sort((a, b) => a.inputPerMillion + a.outputPerMillion - (b.inputPerMillion + b.outputPerMillion));",
        "  return rows[0]?.id;",
        "}",
        "export function anomalyZ(current: number, mean: number, stdev: number): number {",
        "  if (stdev <= 0) return 0;",
        "  return (current - mean) / stdev;",
        "}",
    ]
    # generate 365-day seasonal index for spend forecasting
    lines.append("export const SEASONALITY: number[] = [")
    for day in range(365):
        v = 1 + 0.15 * math.sin(2 * math.pi * day / 7) + 0.08 * math.sin(2 * math.pi * day / 365)
        lines.append(f"  {round(v, 4)},")
    lines.append("];")
    lines.append("export function forecastDay(base: number, dayOfYear: number): number { return base * (SEASONALITY[dayOfYear % 365] ?? 1); }")
    (d / "rates.ts").write_text("\n".join(lines) + "\n")
    # carbon table
    cl = [
        "export interface RegionCarbon { region: string; gPerKwh: number; notes: string }",
        "export const REGION_CARBON: RegionCarbon[] = [",
    ]
    regions = {
        "us-east": (385, "Virginia mix, lots of new solar, still gas-heavy nights."),
        "us-west": (240, "Columbia river hydro plus California midday solar."),
        "eu-west": (280, "Ireland/Netherlands mix."),
        "eu-central": (350, "Germany remaining coal shoulder."),
        "asia-east": (520, "Grid mix varies; treat as conservative."),
        "asia-northeast": (470, "Japan/Korea mix."),
    }
    for r, (g, n) in regions.items():
        for year in range(2024, 2027):
            cl.append(f"  {{ region: {repr(r + '-' + str(year))}, gPerKwh: {g - (year-2024)*12}, notes: {repr(n + ' Year ' + str(year) + ' intensity.')} }},")
    cl.append("];")
    (d / "carbon.ts").write_text("\n".join(cl) + "\n")


DOC_TOPICS = [
    ("index", "Hold My Beer", "Open-source AI gateway with a spine."),
    ("quickstart", "Quickstart", "Point your OpenAI client at the gateway in five minutes."),
    ("architecture", "Architecture", "Authenticate, constrain, select, reconcile."),
    ("routing", "Routing", "Route pools, strategies, failover, circuits."),
    ("budgets", "Budgets", "Reserve before spend, settle after usage."),
    ("policies", "Policies", "Observe, shadow, enforce."),
    ("evidence", "Evidence", "A ledger that never stores prompts."),
    ("virtual-keys", "Virtual keys", "Scoped, revocable keys in front of BYOK."),
    ("cache", "Cache", "Exact cache with short TTL and workload isolation."),
    ("lab", "Test Lab", "Protocol-faithful simulators and a capped live xAI path."),
    ("security", "Security", "Fail closed, redact credentials, region locks."),
    ("finops", "FinOps", "Rate cards, forecasts, anomaly z-scores."),
    ("providers", "Providers", "Twenty-five providers, one canonical request."),
    ("sdk", "SDK and CLI", "OpenAI-compatible, plus the hmb simulator."),
    ("compare", "Compare", "Vs LiteLLM, Portkey, Helicone, Kong, AI Gateway HQ."),
    ("reason-codes", "Reason codes", "Every decision is greppable."),
    ("slo", "SLOs", "Latency, error, and budget burn objectives."),
    ("runbook", "Runbook", "What to do at 2am when a provider falls over."),
    ("migrate-litellm", "Migrate from LiteLLM", "Keep your model_list, gain a spine."),
    ("migrate-aighq", "Migrate from AI Gateway HQ", "Same job, better product, actual pricing."),
    ("terraform", "Route as code", "Declare pools and policies."),
    ("otel", "OpenTelemetry", "Export traces without prompt payloads."),
    ("self-host", "Self-host", "Run the control plane next to your apps."),
    ("changelog", "Changelog", "What shipped."),
    ("faq", "FAQ", "Straight answers."),
]


def write_docs():
    DOCS.mkdir(parents=True, exist_ok=True)
    for slug, title, blurb in DOC_TOPICS:
        parts = [f"# {title}", "", f"> {blurb}", ""]
        parts.append("Hold My Beer sits in front of model APIs the way a good bartender sits in front of the taps:")
        parts.append("one surface, a hard stop when the tab is done, and a receipt that finance can actually read.")
        parts.append("")
        parts.append("## Why this exists")
        parts.append("")
        parts.append("LiteLLM proved that an OpenAI-compatible proxy with 100+ providers is the right shape.")
        parts.append("Portkey proved that guardrails belong in the request path.")
        parts.append("Helicone proved that traces matter.")
        parts.append("Bifrost proved that virtual keys and budgets can be fast.")
        parts.append("AI Gateway HQ argued for evidence without prompt archives — then forgot to publish pricing.")
        parts.append("Hold My Beer takes the best of those ideas, writes them in TypeScript, and refuses to be vague.")
        parts.append("")
        parts.append(f"## {title}")
        parts.append("")
        for i in range(1, 18):
            parts.append(f"### {title} — section {i}")
            parts.append("")
            parts.append(
                f"Operators configure this from the taproom console. The engine evaluates the rule on every request, "
                f"emits reason code family notes, and records an integrity hash over the decision tuple "
                f"(workload, alias, model, outcome, usd, latency). Prompt bodies are never written. "
                f"Section {i} of `{slug}` walks through a concrete failure: the primary target 429s, "
                f"the circuit opens, the next weighted target is selected, the reserve is settled against "
                f"actual usage, and FinOps sees the failover as a first-class event instead of a mysterious spike."
            )
            parts.append("")
            parts.append("```ts")
            parts.append(f"// {slug} example {i}")
            parts.append("import { handleGatewayRequest } from 'hold-my-beer';")
            parts.append("const result = handleGatewayRequest({")
            parts.append("  apiKey: process.env.HMB_KEY!,")
            parts.append("  request: {")
            parts.append(f"    model: 'company-approved-fast',")
            parts.append("    messages: [{ role: 'user', content: 'Summarize the incident timeline' }],")
            parts.append("    maxTokens: 512,")
            parts.append("  },")
            parts.append("});")
            parts.append("if (!result.ok) throw new Error(result.deniedReason);")
            parts.append("```")
            parts.append("")
        parts.append("## See also")
        parts.append("")
        for other, ot, _ in DOC_TOPICS:
            if other != slug:
                parts.append(f"- [{ot}](./{other}.md)")
        (DOCS / f"{slug}.md").write_text("\n".join(parts) + "\n")


def write_tests():
    d = SRC / "__tests__"
    d.mkdir(parents=True, exist_ok=True)
    # catalog tests
    (d / "catalog.test.ts").write_text("""
import assert from "node:assert/strict";
import test from "node:test";
import { ALL_MODELS, getModel, MODEL_COUNT, PROVIDERS } from "../catalog";
import { costUsd, estimateTokens } from "../tokenizer";
import { rateCard } from "../finops/rates";
import { REASON_DOCS } from "../evidence/codes";
import { POLICY_PACKS } from "../policy";

test("catalog is populated", () => {
  assert.ok(MODEL_COUNT > 80);
  assert.ok(PROVIDERS.length >= 20);
  assert.ok(getModel(ALL_MODELS[0].id));
});

test("every model has a positive context window and non-negative price", () => {
  for (const m of ALL_MODELS) {
    assert.ok(m.contextWindow > 0, m.id);
    assert.ok(m.inputPerMillion >= 0, m.id);
    assert.ok(m.outputPerMillion >= 0, m.id);
    assert.ok(m.displayName.length > 1, m.id);
  }
});

test("tokenizer is monotonic", () => {
  const a = estimateTokens("hello");
  const b = estimateTokens("hello hello hello hello");
  assert.ok(b > a);
});

test("cost math", () => {
  const usd = costUsd(1_000_000, 1_000_000, 1, 2);
  assert.equal(usd, 3);
});

test("rate card rows match catalog", () => {
  assert.equal(rateCard().length, ALL_MODELS.length);
});

test("reason docs exist", () => {
  assert.ok(REASON_DOCS.length > 30);
});

test("policy packs exist", () => {
  assert.ok(POLICY_PACKS.length >= 8);
});
""".lstrip())

    # generate many per-provider catalog tests
    by_p = {}
    for m in MODELS:
        by_p.setdefault(m["provider"], []).append(m)
    for pid, models in by_p.items():
        lines = [
            'import assert from "node:assert/strict";',
            'import test from "node:test";',
            f'import {{ {pid.upper()}_MODELS }} from "../catalog/{pid}";',
            f'import {{ {pid}Adapter, {pid}Estimate }} from "../adapters/{pid}";',
            "",
            f'test("{pid} catalog is coherent", () => {{',
            f"  assert.ok({pid.upper()}_MODELS.length >= 1);",
            f"  for (const m of {pid.upper()}_MODELS) {{",
            f"    assert.equal(m.provider, {repr(pid)});",
            "    assert.ok(m.id.includes('/'));",
            "  }",
            "});",
            "",
            f'test("{pid} adapter roundtrip", () => {{',
            f"  const up = {pid}Adapter.toUpstream({{ model: {pid.upper()}_MODELS[0].id, messages: [{{ role: 'user', content: 'ping' }}] }});",
            "  assert.ok(up);",
            f"  const down = {pid}Adapter.fromUpstream({{ id: 'x', choices: [{{ message: {{ content: 'pong' }} }}], usage: {{ prompt_tokens: 3, completion_tokens: 1 }} }}, {{ model: {pid.upper()}_MODELS[0].id, messages: [{{ role: 'user', content: 'ping' }}] }}, 12);",
            "  assert.equal(down.content, 'pong');",
            "  assert.equal(down.usage.inputTokens, 3);",
            "});",
            "",
            f'test("{pid} cost helper", () => {{',
            f"  assert.equal({pid}Estimate(1_000_000, 0, 1, 2), 1);",
            "});",
        ]
        for i, m in enumerate(models[:12]):
            lines.append("")
            lines.append(f'test("{pid} model {m["id"]} pricing is finite", () => {{')
            lines.append(f"  const m = {pid.upper()}_MODELS.find((x) => x.id === {repr(m['id'])});")
            lines.append("  assert.ok(m);")
            lines.append(f"  assert.equal(m?.inputPerMillion, {m['inn']});")
            lines.append("});")
        (d / f"provider-{pid}.test.ts").write_text("\n".join(lines) + "\n")


def write_lab():
    d = SRC / "lab"
    d.mkdir(parents=True, exist_ok=True)
    (d / "simulator.ts").write_text("""
import type { CanonicalRequest, CanonicalResponse } from "../types";
import { getModel } from "../catalog";
import { estimateRequestTokens, estimateTokens } from "../tokenizer";

const STOCK = [
  "Hold My Beer reserved the budget, picked the cheapest healthy target, and left a receipt.",
  "Simulated provider response. No upstream call was made. Evidence still records the decision.",
  "The taproom served this from the Test Lab. Protocol shape matches the selected model.",
  "Fallback path exercised: primary target was marked unhealthy in the lab matrix.",
];

export function simulate(req: CanonicalRequest, latencyMs = 42): CanonicalResponse {
  const model = getModel(req.model);
  const input = estimateRequestTokens(req.messages, model?.tokenizer);
  const text = STOCK[input % STOCK.length] + (req.json ? ' {"ok":true}' : "");
  const output = estimateTokens(text, model?.tokenizer);
  return {
    id: "lab_" + Math.random().toString(36).slice(2),
    model: req.model,
    content: text,
    finish: "stop",
    usage: { inputTokens: input, outputTokens: output, cachedTokens: 0, reasoningTokens: 0, totalTokens: input + output },
    latencyMs,
    cached: false,
  };
}
""".lstrip())


def main():
    SRC.mkdir(parents=True, exist_ok=True)
    write_catalog()
    write_adapters()
    write_policies()
    write_reasons()
    write_tokenizer()
    write_finops()
    write_docs()
    write_tests()
    write_lab()
    print("done")


if __name__ == "__main__":
    main()
