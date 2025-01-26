<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a paginated list of notifications.
     */
    public function index(Request $request)
    {

        $notifications = Notification::paginate(10);

        return response()->json([
            'data' => $notifications->items(), // Paginated items
            'meta' => [
                'current_page' => $notifications->currentPage(),
                'last_page' => $notifications->lastPage(),
                'per_page' => $notifications->perPage(),
                'total' => $notifications->total(),
            ],
            'links' => [
                'prev' => $notifications->previousPageUrl(),
                'next' => $notifications->nextPageUrl(),
            ],
        ]);
    }

    /**
     * Increment views for a notification
     */
    public function incrementViews($id)
    {
        $notification = Notification::findOrFail($id); // Find the notification by ID
        $notification->views += 1; // Increment the views count
        $notification->save(); // Save the updated notification

        return response()->json([
            'message' => 'Views updated successfully',
            'views' => $notification->views,
        ]);
    }
    
    /**
     * Store a newly created notification in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:240',
            'text' => 'required|string',
        ]);

        $notification = Notification::create([
            'title' => $request->title,
            'text' => $request->text,
            'views' => 0, // Default views to 0
            'date_added' => now(),
        ]);

        return response()->json($notification, 201);
    }

    /**
     * Display the specified notification.
     */
    public function show(Notification $notification)
    {
        return response()->json($notification);
    }

    /**
     * Update the specified notification in storage.
     */
    public function update(Request $request, Notification $notification)
    {
        $request->validate([
            'title' => 'required|string|max:240',
            'text' => 'required|string',
        ]);

        $notification->update([
            'title' => $request->title,
            'text' => $request->text,
        ]);

        return response()->json($notification);
    }

    /**
     * Remove the specified notification from storage.
     */
    public function destroy(Notification $notification)
    {
        $notification->delete();

        return response()->json(['message' => 'Notification deleted successfully.']);
    }
}
