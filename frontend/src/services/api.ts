import type { User } from "../types/user";

const API_URL = import.meta.env.VITE_API_URL;

async function authenticatedFetch(
    endpoint: string,
    options: RequestInit = {}
) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        throw new Error("UNAUTHORIZED");
    }

    if (!response.ok) {
        throw new Error("API_ERROR");
    }

    return response;
}

export async function getTasks() {
    const response = await authenticatedFetch("/tasks");

    return response.json();
}

type LoginResponse = {
    message: string;
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
};

export async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error("LOGIN_ERROR");
    }

    const data: LoginResponse = await response.json();

    return data;
}

export async function createTask(title: string) {
    const response = await authenticatedFetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
        }),
    });

    return response.json();
}

export async function updateTask(
    id: number,
    title: string,
    completed: boolean
) {
    const response = await authenticatedFetch(`/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            completed,
        }),
    });

    return response.json();
}

export async function deleteTask(id: number) {

    const response = await authenticatedFetch(`/tasks/${id}`, {
        method: "DELETE",
    });

    return response.json();
}

export async function register(
    name: string,
    email: string,
    password: string
) {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });

    if (response.status === 409) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    if (!response.ok) {
        throw new Error("REGISTER_ERROR");
    }

    return response.json();
}

export async function getCurrentUser(): Promise<User> {
    const response = await authenticatedFetch("/users/me");

    return response.json();
}