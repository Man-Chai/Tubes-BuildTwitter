document.addEventListener('DOMContentLoaded', function() {
    // Initialize notifications page functionality
    initNotificationsPage();
});

function initNotificationsPage() {
    // Load all notifications
    loadNotifications();
    
    // Setup filter tabs
    setupNotificationFilters();
    
    // Highlight active nav item
    highlightActiveNav();
    
    // Setup notification interactions
    setupNotificationInteractions();
}

function loadNotifications() {
    // In a real app, this would fetch from an API
    const notifications = [
        {
            type: "like",
            user: {
                name: "Shayna",
                username: "@shayna",
                avatar: "assets/girl1.png",
                verified: true
            },
            tweetContent: "Working on a new UI design system for our product. Can't wait to share it with everyone!",
            time: "2 min ago",
            read: false
        },
        {
            type: "retweet",
            user: {
                name: "Masayoshi",
                username: "@masayoshi",
                avatar: "assets/man1.png",
                verified: true
            },
            tweetContent: "The key to successful remote work is communication and discipline.",
            time: "15 min ago",
            read: false
        },
        {
            type: "follow",
            user: {
                name: "Ramina",
                username: "@ramina",
                avatar: "assets/girl2.png",
                verified: true
            },
            time: "1 hour ago",
            read: true
        },
        {
            type: "reply",
            user: {
                name: "BuildWithAngga",
                username: "@buildwithangga",
                avatar: "assets/bwa-profile.png",
                verified: true
            },
            tweetContent: "Just launched a new course on advanced JavaScript techniques!",
            replyContent: "This looks amazing! Can't wait to try it out.",
            time: "3 hours ago",
            read: true
        },
        {
            type: "mention",
            user: {
                name: "John Doe",
                username: "@johndoe",
                avatar: "assets/man2.png",
                verified: false
            },
            tweetContent: "Hey @yourusername, check out this cool feature I found!",
            time: "5 hours ago",
            read: true
        }
    ];
    
    const notificationsContainer = document.getElementById('notificationsContainer');
    notificationsContainer.innerHTML = '';
    
    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = `notification-item border-b border-line hover:bg-gray-900 ${notification.read ? '' : 'bg-blue-50 bg-opacity-10'}`;
        
        let notificationContent = '';
        let icon = '';
        
        switch(notification.type) {
            case 'like':
                icon = 'assets/heart-filled.svg';
                notificationContent = `
                    <div class="flex items-center text-sm text-username mb-1">
                        <img src="${icon}" alt="Like" class="w-5 h-5 mr-2 text-pink-500">
                        <span>Liked your post</span>
                    </div>
                `;
                break;
            case 'retweet':
                icon = 'assets/retweet-filled.svg';
                notificationContent = `
                    <div class="flex items-center text-sm text-username mb-1">
                        <img src="${icon}" alt="Retweet" class="w-5 h-5 mr-2 text-green-500">
                        <span>Retweeted your post</span>
                    </div>
                `;
                break;
            case 'follow':
                icon = 'assets/user-plus.svg';
                notificationContent = `
                    <div class="flex items-center text-sm text-username mb-1">
                        <img src="${icon}" alt="Follow" class="w-5 h-5 mr-2 text-blue-500">
                        <span>Followed you</span>
                    </div>
                `;
                break;
            case 'reply':
                icon = 'assets/comment-filled.svg';
                notificationContent = `
                    <div class="flex items-center text-sm text-username mb-1">
                        <img src="${icon}" alt="Reply" class="w-5 h-5 mr-2 text-blue-500">
                        <span>Replied to your post</span>
                    </div>
                    <div class="mt-2 p-3 bg-gray-800 rounded-lg">
                        <p class="text-sm">${notification.replyContent}</p>
                    </div>
                `;
                break;
            case 'mention':
                icon = 'assets/mention.svg';
                notificationContent = `
                    <div class="flex items-center text-sm text-username mb-1">
                        <img src="${icon}" alt="Mention" class="w-5 h-5 mr-2 text-blue-500">
                        <span>Mentioned you</span>
                    </div>
                `;
                break;
        }
        
        notificationElement.innerHTML = `
            <div class="p-4">
                <div class="flex">
                    <div class="mr-3">
                        <img src="${notification.user.avatar}" alt="Profile" class="w-12 h-12 rounded-full">
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between items-start">
                            <div>
                                <p class="font-bold">${notification.user.name} ${notification.user.verified ? '<img src="assets/verify.png" alt="Verified" class="inline w-4 h-4">' : ''}</p>
                                <p class="text-sm text-username">${notification.user.username}</p>
                            </div>
                            <p class="text-sm text-username">${notification.time}</p>
                        </div>
                        
                        ${notificationContent}
                        
                        ${notification.tweetContent ? `
                        <div class="mt-2 p-3 bg-gray-800 rounded-lg">
                            <p class="text-sm">${notification.tweetContent}</p>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        notificationsContainer.appendChild(notificationElement);
    });
}

function setupNotificationFilters() {
    const filterTabs = document.querySelectorAll('.notification-filter');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('border-blue-500', 'text-blue-500'));
            
            // Add active class to clicked tab
            this.classList.add('border-blue-500', 'text-blue-500');
            
            // Get filter type
            const filterType = this.getAttribute('data-filter');
            
            // In a real app, this would filter notifications from the server
            console.log('Filtering by:', filterType);
            
            // For demo, we'll just reload all notifications
            loadNotifications();
        });
    });
}

function setupNotificationInteractions() {
    // Mark as read functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.notification-item')) {
            const notificationItem = e.target.closest('.notification-item');
            notificationItem.classList.remove('bg-blue-50', 'bg-opacity-10');
            
            // In a real app, this would send a request to mark as read
        }
    });
    
    // Settings button
    const settingsBtn = document.getElementById('notificationSettings');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            // In a real app, this would open notification settings
            console.log('Opening notification settings');
        });
    }
}

function highlightActiveNav() {
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop();
    
    // Remove active class from all nav items
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active-nav-item');
    });
    
    // Add active class to current page nav item
    if (currentPage === 'notifications.html') {
        document.querySelector('a[href="notifications.html"]').classList.add('active-nav-item');
    }
}

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNotificationsPage,
        loadNotifications,
        setupNotificationFilters,
        setupNotificationInteractions,
        highlightActiveNav
    };
}