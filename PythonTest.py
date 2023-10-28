from pymongo import MongoClient

# Import essential modules
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity


client = MongoClient('localhost', 27017)

db = client.Test1
collection = db.Questions


# Content based recommendation algorithm
# Implemented only the feature-based ones, not including machine learning (for simplicity)

def read_processed_data():
    df = pd.DataFrame(collection.find())
    df = df.drop(["_id", "__v", "bookmarked"],axis = 1)
    print(df)
    for idx, v in df.iterrows():
        df.iloc[idx]["questionType"] = df.iloc[idx].question["questionType"]
    print(df)

read_processed_data()



NUM_RECOMMENDATION_CANDIDATES = 20
class CB_Recommender:
    def __init__(self):

        # Data preparation
        self.movieData, _ = read_processed_data()

        # Features displayed to users (RLY NEEDED? )
        self.displayedFeatures = [
            "genres",
            "overview",
            "production_companies",
            #"popularity",
            "release_date",
            "tagline",
            "numeric_release_date",
            "keywords",
            #"score",
            #"numeric_release_date"
        ]

        # Additional Feature Descriptions
        self.addFeatureDesc = {
            "genres": "(e.g. Comedy, Action, Romance)",
            "keywords": "(e.g. Ocean, Spy, Future, Underworld)",
            "overview": "(This is the general description of the movie)",
            "production_companies": "(e.g. DreamWorks Animation, Walt Disney Pictures, Universal Pictures)",
            "release_date": "(e.g. 2015-12-02, 1999-04-30)",
            "numeric_release_date": "(The length of the movie. e.g. 120 minutes)",
            "tagline": "A catchphrase or slogan of a movie",
        }
        
        # Columns used for feature weight collection (0.5 ~ 1.5)
        self.featureWeights = pd.Series({
            "genres": 0,
            "overview": 0,
            "production_companies": 0,
            #"popularity",
            "release_date": 0,
            "tagline": 0,
            "numeric_release_date": 0,
            "keywords": 0,
            #"score",
            #"numeric_release_date"
        })
        self.featureWeights[:] = 1
        

        # Create movie vectors (size: movie length x lots of features)
        self.finalVectors = self.createVectors(self.movieData)


        # Create a user vector (for only one person)

        NUM_FEATURES = self.finalVectors.shape[1]

        # self.userRatings = np.zeros(NUM_MOVIES)

        self.userRating = []

        self.userVector = np.zeros(NUM_FEATURES)

        # Sort to highest (stores the indexes of the movies similar to one)
        self.movieSimiarlityMatrix = cosine_similarity(self.finalVectors).argsort()[:, ::-1]

        #print(self.movieSimiarlityMatrix.shape)
    
    def createVectors(self, data):

        # Create CountVectorizers (this is used for determined genres, keywords, all of which have eqaul weighting)
        g_transformer = CountVectorizer(tokenizer = lambda x: x.split('/'))
        genresVectorizer = g_transformer.fit(data["genres"])
        genresVectors = genresVectorizer.transform(data["genres"])

        k_transformer = CountVectorizer(tokenizer = lambda x: x.split('/'))
        kwVectorizer = k_transformer.fit(data["keywords"])
        kwVectors = kwVectorizer.transform(data["keywords"])

        prod_transformer = CountVectorizer(tokenizer = lambda x: x.split('/'))
        prodVectorizer = prod_transformer.fit(data["production_companies"])
        prodVectors = prodVectorizer.transform(data["production_companies"])


        # TF-IDF Vectorizer for overview and tagline  
        ov_transformer = TfidfVectorizer()
        textVectors = ov_transformer.fit(data["overview"])
        textVectors = ov_transformer.transform(data["overview"])

        tag_transformer = TfidfVectorizer()
        tagVectors = tag_transformer.fit(data["tagline"])
        tagVectors = tag_transformer.transform(data["tagline"])

        date_scaler = MinMaxScaler()
        norm_date = date_scaler.fit_transform(np.array(data["numeric_release_date"]).reshape(-1, 1))


        # Add all vector features to create the finalVector for every movies
        return np.hstack([
            genresVectors.toarray() * self.featureWeights["genres"], 
            kwVectors.toarray() * self.featureWeights["keywords"], 
            prodVectors.toarray() * self.featureWeights["production_companies"],
            textVectors.toarray() * self.featureWeights["overview"],
            tagVectors.toarray() * self.featureWeights["tagline"],
            norm_date * self.featureWeights["numeric_release_date"]
            ])    

    def update_user_vector(self, user):
        # rating min: 1, max: 10
        userRatings = user.ratings - (1 + 10) / 2

        if np.std(user.ratings) == 0:
            # If the user hasn't rated anything
            norm_userRatings = np.zeros_like(userRatings)

        else:
            # Z-score normalisation
            norm_userRatings = (userRatings - np.mean(userRatings)) / np.std(userRatings)

            # uv_scaler = StandardScaler()
            # norm_userRatings = uv_scaler.fit_transform(np.array(userRatings).reshape(-1, 1))

        # Multiplying user ratings to the movie item features (Look Table 2.1.6 in the EE)
        self.userVector = np.dot(norm_userRatings, self.finalVectors)


        


    def get_similar_movies(self, title, top = NUM_RECOMMENDATION_CANDIDATES, sortby = None):
        
        # Find the target movie index
        targetMovieIndex = self.movieData[self.movieData["title"] == title].index

        if targetMovieIndex.size == 0:
            # print(f"No movie named \"{title}\" exists on the database")
            return
        
        # Include the movie itself by doing [0:]
        targetVector = self.movieSimiarlityMatrix[targetMovieIndex, :top].reshape(-1)[0:]

        pure = self.movieData.iloc[targetVector]

        if sortby == None:
            return pure
        else:
            return pure.sort_values(sortby).iloc[::-1]


    def get_recommended_movies(self, top = NUM_RECOMMENDATION_CANDIDATES, sortby = None):
        
        # Find the similarity between user vector and the movie vectors and then sorts the index in descending order
        recommended_movies = cosine_similarity(self.userVector.reshape(1, -1), self.finalVectors).argsort()[0][::-1][:top]
        pure = self.movieData.iloc[recommended_movies]

        if sortby == None:
            return pure
        else:
            return pure.sort_values(sortby).iloc[::-1]


#cbr = CB_Recommender()
