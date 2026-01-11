class NewsService {
    constructor() {
        this.apiKey = process.env.NEWS_API_KEY;
        this.baseUrl = 'https://newsapi.org/v2';
    }

    async getTopHeadlines(category = null, country = 'us') {
        try {
            const params = new URLSearchParams({
                apiKey: this.apiKey,
                country: country,
                pageSize: '20'
            });

            if (category) {
                params.append('category', category);
            }

            const url = `${this.baseUrl}/top-headlines?${params.toString()}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Transform the response to match our expected format
            const articles = data.articles.map((article, index) => ({
                id: index + 1,
                title: article.title,
                content: article.description || article.content,
                category: category || 'general',
                publishedAt: article.publishedAt,
                source: article.source.name,
                url: article.url,
                urlToImage: article.urlToImage
            }));

            return articles;
        } catch (error) {
            console.error('Error fetching news:', error.message);
            throw new Error('Failed to fetch news from external API');
        }
    }

    async getNewsByPreferences(preferences = []) {
        try {
            // If no preferences, get general news
            if (!preferences || preferences.length === 0) {
                return await this.getTopHeadlines();
            }

            // Map user preferences to NewsAPI categories
            const categoryMap = {
                'technology': 'technology',
                'sports': 'sports',
                'business': 'business',
                'entertainment': 'entertainment',
                'health': 'health',
                'science': 'science',
                'movies': 'entertainment',
                'comics': 'entertainment',
                'games': 'entertainment'
            };

            // Get news for each preference category
            const allNews = [];
            for (const preference of preferences) {
                const category = categoryMap[preference.toLowerCase()] || 'general';
                try {
                    const news = await this.getTopHeadlines(category);
                    allNews.push(...news.slice(0, 5)); // Limit to 5 articles per category
                } catch (error) {
                    console.warn(`Failed to fetch news for category ${category}:`, error.message);
                }
            }

            // Remove duplicates based on title
            const uniqueNews = allNews.filter((article, index, self) =>
                index === self.findIndex(a => a.title === article.title)
            );

            return uniqueNews.slice(0, 20); // Limit total results
        } catch (error) {
            console.error('Error fetching personalized news:', error.message);
            // Fallback to general news
            return await this.getTopHeadlines();
        }
    }
}

module.exports = new NewsService();