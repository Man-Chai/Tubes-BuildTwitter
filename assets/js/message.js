document.addEventListener('DOMContentLoaded', function() {
    // Initialize messages page functionality
    initMessagesPage();
});

function initMessagesPage() {
    // Load conversations
    loadConversations();
    
    // Load initial messages for first conversation
    if (document.querySelector('.conversation-item')) {
        loadMessages(1); // Load messages for first conversation
        document.querySelector('.conversation-item').classList.add('active');
    }
    
    // Setup event listeners
    setupMessageInteractions();
    
    // Highlight active nav item
    highlightActiveNav();
}

function loadConversations() {
    // In a real app, this would fetch from an API
    const conversations = [
        {
            id: 1,
            user: {
                name: "Shayna",
                username: "@shayna",
                avatar: "assets/girl1.png",
                verified: true
            },
            lastMessage: "Hey, how's the project going?",
            time: "2 min ago",
            unread: 2
        },
        {
            id: 2,
            user: {
                name: "Masayoshi",
                username: "@masayoshi",
                avatar: "assets/man1.png",
                verified: true
            },
            lastMessage: "Let's meet tomorrow to discuss the timeline",
            time: "1 hour ago",
            unread: 0
        },
        {
            id: 3,
            user: {
                name: "Ramina",
                username: "@ramina",
                avatar: "assets/girl2.png",
                verified: true
            },
            lastMessage: "I've sent you the design files",
            time: "3 hours ago",
            unread: 1
        },
        {
            id: 4,
            user: {
                name: "BuildWithAngga",
                username: "@buildwithangga",
                avatar: "assets/bwa-profile.png",
                verified: true
            },
            lastMessage: "Thanks for joining our course!",
            time: "1 day ago",
            unread: 0
        }
    ];
    
    const conversationsContainer = document.getElementById('conversationsList');
    conversationsContainer.innerHTML = '';
    
    conversations.forEach(conversation => {
        const conversationElement = document.createElement('div');
        conversationElement.className = `conversation-item hover:bg-gray-900 border-b border-line cursor-pointer ${conversation.unread > 0 ? 'bg-blue-50 bg-opacity-10' : ''}`;
        conversationElement.dataset.conversationId = conversation.id;
        
        conversationElement.innerHTML = `
            <div class="flex justify-between items-center p-4">
                <div class="flex items-center">
                    <img src="${conversation.user.avatar}" alt="Profile" class="w-12 h-12 rounded-full">
                    <div class="ml-3">
                        <p class="font-bold">${conversation.user.name} ${conversation.user.verified ? '<img src="assets/verify.png" alt="Verified" class="inline w-4 h-4">' : ''}</p>
                        <p class="text-sm text-username">${conversation.user.username}</p>
                        <p class="text-sm truncate max-w-[200px]">${conversation.lastMessage}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-xs text-username">${conversation.time}</p>
                    ${conversation.unread > 0 ? `
                    <div class="flex justify-end mt-1">
                        <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-xs">${conversation.unread}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        conversationsContainer.appendChild(conversationElement);
    });
}

function loadMessages(conversationId) {
    // In a real app, this would fetch from an API based on conversationId
    const messages = {
        1: [
            {
                id: 1,
                sender: "receiver",
                content: "Hey there! How's the project going?",
                time: "2:30 PM"
            },
            {
                id: 2,
                sender: "sender",
                content: "Going well! Just finished the UI components.",
                time: "2:32 PM"
            },
            {
                id: 3,
                sender: "receiver",
                content: "That's great! Can you share the screens?",
                time: "2:33 PM"
            },
            {
                id: 4,
                sender: "sender",
                content: "Sure, I'll send them over in a bit.",
                time: "2:35 PM"
            }
        ],
        2: [
            {
                id: 1,
                sender: "receiver",
                content: "Let's meet tomorrow to discuss the timeline",
                time: "1:15 PM"
            }
        ],
        3: [
            {
                id: 1,
                sender: "receiver",
                content: "I've sent you the design files",
                time: "11:30 AM"
            }
        ],
        4: [
            {
                id: 1,
                sender: "receiver",
                content: "Thanks for joining our course!",
                time: "Yesterday"
            }
        ]
    };
    
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '';
    
    // Update chat header with current conversation info
    const conversationElement = document.querySelector(`.conversation-item[data-conversation-id="${conversationId}"]`);
    if (conversationElement) {
        const avatar = conversationElement.querySelector('img').src;
        const name = conversationElement.querySelector('.font-bold').textContent.trim();
        const username = conversationElement.querySelector('.text-username').textContent.trim();
        
        document.getElementById('currentChatAvatar').src = avatar;
        document.getElementById('currentChatName').innerHTML = name;
        document.getElementById('currentChatUsername').textContent = username;
    }
    
    // Add messages to container
    messages[conversationId].forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender === 'sender' ? 'sent' : 'received'}`;
        
        messageElement.innerHTML = `
            <div class="flex ${message.sender === 'sender' ? 'justify-end' : 'items-start'} mb-4">
                ${message.sender === 'receiver' ? `<img src="${document.getElementById('currentChatAvatar').src}" alt="Profile" class="w-10 h-10 rounded-full mr-3">` : ''}
                <div class="max-w-[70%]">
                    <div class="${message.sender === 'sender' ? 'bg-blue-500' : 'bg-secondary'} rounded-2xl p-3">
                        <p>${message.content}</p>
                    </div>
                    <p class="text-xs text-username mt-1 ${message.sender === 'sender' ? 'text-right' : ''}">${message.time}</p>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom of messages
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function setupMessageInteractions() {
    // Conversation click handler
    document.addEventListener('click', function(e) {
        const conversationItem = e.target.closest('.conversation-item');
        if (conversationItem) {
            // Remove active class from all conversations
            document.querySelectorAll('.conversation-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked conversation
            conversationItem.classList.add('active');
            
            // Load messages for this conversation
            const conversationId = conversationItem.dataset.conversationId;
            loadMessages(conversationId);
        }
    });
    
    // Send message handler
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const messageInput = document.getElementById('messageInput');
    
    if (sendMessageBtn && messageInput) {
        sendMessageBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // New message button
    const newMessageBtn = document.getElementById('newMessageBtn');
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', function() {
            // In a real app, this would open a new message dialog
            console.log('New message button clicked');
        });
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message) {
        const messagesContainer = document.getElementById('messagesContainer');
        
        // Create new message element
        const messageElement = document.createElement('div');
        messageElement.className = 'message sent';
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            <div class="flex justify-end mb-4">
                <div class="max-w-[70%]">
                    <div class="bg-blue-500 rounded-2xl p-3">
                        <p>${message}</p>
                    </div>
                    <p class="text-xs text-username mt-1 text-right">${timeString}</p>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messageInput.value = '';
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // In a real app, this would send the message to the server
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
    if (currentPage === 'messages.html') {
        document.querySelector('a[href="messages.html"]').classList.add('active-nav-item');
    }
}

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMessagesPage,
        loadConversations,
        loadMessages,
        setupMessageInteractions,
        sendMessage,
        highlightActiveNav
    };
}