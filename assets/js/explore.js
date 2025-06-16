document.addEventListener('DOMContentLoaded', function() {
    // Initialize explore page functionality
    initExplorePage();
});

function initExplorePage() {
    // Load trends data
    loadTrends();
    
    // Load who to follow suggestions
    loadFollowSuggestions();
    
    // Load popular tweets
    loadPopularTweets();
    
    // Setup search functionality
    setupSearch();
    
    // Highlight active nav item
    highlightActiveNav();
}

function loadTrends() {
    // In a real app, this would fetch from an API
    const trends = [
        {
            rank: 1,
            location: "Indonesia",
            topic: "#BuildWithAngga",
            posts: "15.2K"
        },
        {
            rank: 2,
            location: "Technology",
            topic: "JavaScript Frameworks",
            posts: "25.7K"
        },
        {
            rank: 3,
            location: "Trending",
            topic: "#RemoteWork",
            posts: "102.5K"
        },
        {
            rank: 4,
            location: "Business",
            topic: "Startup Funding",
            posts: "8.3K"
        },
        {
            rank: 5,
            location: "Sports",
            topic: "#WorldCup2026",
            posts: "125K"
        }
    ];
    
    const trendsContainer = document.getElementById('trendsContainer');
    trendsContainer.innerHTML = '';
    
    trends.forEach((trend, index) => {
        const trendElement = document.createElement('a');
        trendElement.className = 'trend-item hover:bg-gray-900 block';
        trendElement.href = `#${trend.topic.replace('#', '').toLowerCase()}`;
        
        trendElement.innerHTML = `
            <div class="flex justify-between items-center p-4">
                <div>
                    <p class="text-sm text-username">${index + 1} · Trending in ${trend.location}</p>
                    <p class="text-base font-bold">${trend.topic}</p>
                    <p class="text-sm text-username">${trend.posts} posts</p>
                </div>
                <img src="assets/more.svg" alt="More" class="w-5 h-5">
            </div>
        `;
        
        trendsContainer.appendChild(trendElement);
    });
}

function loadFollowSuggestions() {
    // In a real app, this would fetch from an API
    const suggestions = [
        {
            name: "Shayna",
            username: "@shayna",
            avatar: "assets/girl1.png",
            verified: true
        },
        {
            name: "Masayoshi",
            username: "@masayoshi",
            avatar: "assets/man1.png",
            verified: true
        },
        {
            name: "Ramina",
            username: "@ramina",
            avatar: "assets/girl2.png",
            verified: true
        }
    ];
    
    const suggestionsContainer = document.getElementById('followSuggestions');
    suggestionsContainer.innerHTML = '';
    
    suggestions.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'follow-suggestion hover:bg-gray-900';
        
        userElement.innerHTML = `
            <div class="flex justify-between items-center p-4">
                <div class="flex items-center">
                    <img src="${user.avatar}" alt="Profile" class="w-12 h-12 rounded-full">
                    <div class="ml-3">
                        <p class="font-bold">${user.name} ${user.verified ? '<img src="assets/verify.png" alt="Verified" class="inline w-4 h-4">' : ''}</p>
                        <p class="text-sm text-username">${user.username}</p>
                    </div>
                </div>
                <button class="btn-white-small">Follow</button>
            </div>
        `;
        
        suggestionsContainer.appendChild(userElement);
    });
}

function loadPopularTweets() {
    // In a real app, this would fetch from Twitt.js or an API
    const tweets = [
        {
            avatar: "assets/bwa-profile.png",
            name: "BuildWithAngga",
            username: "@buildwithangga",
            time: "2h",
            content: "Just launched a new course on advanced JavaScript techniques! Check it out on our platform. #JavaScript #WebDev",
            comments: 24,
            retweets: 56,
            likes: 189,
            verified: true
        },
        {
            avatar: "assets/girl1.png",
            name: "Shayna",
            username: "@shayna",
            time: "4h",
            content: "Working on a new UI design system for our product. Can't wait to share it with everyone! #UIDesign #ProductDesign",
            comments: 12,
            retweets: 34,
            likes: 256,
            verified: true
        },
        {
            avatar: "assets/man1.png",
            name: "Masayoshi",
            username: "@masayoshi",
            time: "6h",
            content: "The key to successful remote work is communication and discipline. What are your tips for staying productive while working remotely? #RemoteWork #Productivity",
            comments: 42,
            retweets: 78,
            likes: 512,
            verified: true
        }
    ];
    
    const tweetsContainer = document.getElementById('exploreTwitts');
    tweetsContainer.innerHTML = '';
    
    tweets.forEach(tweet => {
        const tweetElement = document.createElement('div');
        tweetElement.className = 'tweet-item border-b border-line hover:bg-gray-900';
        
        tweetElement.innerHTML = `
            <div class="p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <img src="${tweet.avatar}" alt="Profile" class="w-12 h-12 rounded-full">
                        <div class="ml-3">
                            <p class="font-bold">${tweet.name} ${tweet.verified ? '<img src="assets/verify.png" alt="Verified" class="inline w-4 h-4">' : ''}</p>
                            <p class="text-sm text-username">${tweet.username} · ${tweet.time}</p>
                        </div>
                    </div>
                    <img src="assets/more.svg" alt="More" class="w-5 h-5 cursor-pointer">
                </div>
                <p class="mt-3 ml-[60px]">${tweet.content}</p>
                <div class="flex justify-between mt-3 ml-[60px] max-w-md">
                    <button class="flex items-center text-username hover:text-blue-400">
                        <img src="assets/comment.svg" alt="Comment" class="w-5 h-5 mr-1">
                        <span>${tweet.comments}</span>
                    </button>
                    <button class="flex items-center text-username hover:text-green-400">
                        <img src="assets/retweet.svg" alt="Retweet" class="w-5 h-5 mr-1">
                        <span>${tweet.retweets}</span>
                    </button>
                    <button class="flex items-center text-username hover:text-pink-400">
                        <img src="assets/heart.svg" alt="Like" class="w-5 h-5 mr-1">
                        <span>${tweet.likes}</span>
                    </button>
                    <button class="flex items-center text-username hover:text-blue-400">
                        <img src="assets/share.svg" alt="Share" class="w-5 h-5 mr-1">
                    </button>
                </div>
            </div>
        `;
        
        tweetsContainer.appendChild(tweetElement);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchExplore');
    
    searchInput.addEventListener('input', function(e) {
        // In a real app, this would trigger a search API call
        console.log('Searching for:', e.target.value);
        
        // You could add debouncing here for better performance
    });
    
    searchInput.addEventListener('focus', function() {
        // Highlight the search box when focused
        this.parentElement.classList.add('ring-2', 'ring-blue-500');
    });
    
    searchInput.addEventListener('blur', function() {
        // Remove highlight when blurred
        this.parentElement.classList.remove('ring-2', 'ring-blue-500');
    });
}

function highlightActiveNav() {
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop();
    
    // Remove active class from all nav items
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active-nav-item');
    });
    
    // Add active class to current page nav item
    if (currentPage === 'explore.html') {
        document.querySelector('a[href="explore.html"]').classList.add('active-nav-item');
    }
}

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initExplorePage,
        loadTrends,
        loadFollowSuggestions,
        loadPopularTweets,
        setupSearch,
        highlightActiveNav
    };
}