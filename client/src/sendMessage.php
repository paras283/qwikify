<?php
header("Content-Type: application/json");

// Replace these with your actual Telegram bot token and chat ID
$botToken = '8090940856:AAGf9lxjAm7opuBnmS0RlwKWEZ2NxkZ7Q9c';
$chatId = '647639463';

// Get POST data from the request
$requestData = json_decode(file_get_contents("php://input"), true);

// Check if the message field is provided
if (!isset($requestData['message'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing required field: message."]);
    exit;
}

$message = $requestData['message'];

// Telegram API URL
$apiUrl = "https://api.telegram.org/bot$botToken/sendMessage";

// Data to be sent to the Telegram API
$data = [
    "chat_id" => $chatId,
    "text" => $message,
    "parse_mode" => "Markdown"
];

// Use cURL to send the request
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

// Check if the request was successful
if ($httpCode === 200) {
    echo json_encode(["status" => "success", "message" => "Message sent successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to send message.", "response" => $response]);
}
