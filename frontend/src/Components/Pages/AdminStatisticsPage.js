import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import axios from 'axios';

function AdminStatisticsPage() {
  const [mostFollowedArtists, setMostFollowedArtists] = useState([]);
  const [mostFavoriteArtworks, setMostFavoriteArtworks] = useState([]);
  const [topSellingArtists, setTopSellingArtists] = useState([]);
  const [topCollectors, setTopCollectors] = useState([]);
  const [highestBids, setHighestBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = [
          axios.get('http://localhost:8080/admin/mostFollowedArtists'),
          axios.get('http://localhost:8080/admin/mostFavoriteArtworks'),
          axios.get('http://localhost:8080/admin/topSellingArtists'),
          axios.get('http://localhost:8080/admin/topCollectors'),
          axios.get('http://localhost:8080/admin/highestBids'),
        ];

        const [
          mostFollowedArtistsResponse,
          mostFavoriteArtworksResponse,
          topSellingArtistsResponse,
          topCollectorsResponse,
          highestBidsResponse,
        ] = await Promise.all(requests);

        console.log('Most Followed Artists:', mostFollowedArtistsResponse.data);
        console.log('Most Favorite Artworks:', mostFavoriteArtworksResponse.data);
        console.log('Top Selling Artists:', topSellingArtistsResponse.data);
        console.log('Top Collectors:', topCollectorsResponse.data);
        console.log('Highest Bids:', highestBidsResponse.data);

        setMostFollowedArtists(mostFollowedArtistsResponse.data);
        setMostFavoriteArtworks(mostFavoriteArtworksResponse.data);
        setTopSellingArtists(topSellingArtistsResponse.data);
        setTopCollectors(topCollectorsResponse.data);
        setHighestBids(highestBidsResponse.data);
      } catch (error) {
        console.error('Error fetching admin statistics:', error.response ? error.response.data : error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Admin Statistics
      </Typography>

      {isLoading && <CircularProgress />}

      {!isLoading && (
        <>
          {/* Most Followed Artists Table */}
          <Box mb={4}>
            <Typography variant="h6" mb={2}>
              Top Most Followed Artists
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Artist Name</TableCell>
                    <TableCell>Followers Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mostFollowedArtists.map((artist) => (
                    <TableRow key={`mostFollowed_${artist.user_id}`}>
                      <TableCell>{`${artist.user_name} ${artist.user_surname}`}</TableCell>
                      <TableCell>{artist.follower_count}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Most Favorite Artworks Table */}
          <Box mb={4}>
            <Typography variant="h6" mb={2}>
              Top Most Favorite Artworks
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Artwork Title</TableCell>
                    <TableCell>Favorites Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mostFavoriteArtworks.map((artwork) => (
                    <TableRow key={`mostFavorite_${artwork.artwork_id}`}>
                      <TableCell>{artwork.title}</TableCell>
                      <TableCell>{artwork.favorite_count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Top Selling Artists Table */}
          <Box mb={4}>
            <Typography variant="h6" mb={2}>
              Top Selling Artists
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Artist Name</TableCell>
                    <TableCell>Sold Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topSellingArtists.map((artist, index) => {
                    const artistName = Object.keys(artist)[0];
                    const salesCount = artist[artistName];

                    return (
                      <TableRow key={`topSelling_${index}`}>
                        <TableCell>{artistName}</TableCell>
                        <TableCell>{salesCount}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Top Collectors Table */}
          <Box mb={4}>
            <Typography variant="h6" mb={2}>
              Top Collectors
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Collector Name</TableCell>
                    <TableCell>Collected Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topCollectors.map((collector, index) => {
                    const [name, ownedArtworksCount] = Object.entries(collector)[0];
                    const cleanName = name.replace(/[{}=\d]/g, '');

                    return (
                      <TableRow key={`topCollectors_${index}`}>
                        <TableCell>{`${cleanName}`}</TableCell>
                        <TableCell>{ownedArtworksCount}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Highest Bids Table */}
          <Box mb={4}>
            <Typography variant="h6" mb={2}>
              Highest Bids
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Artwork Title</TableCell>
                    <TableCell>Highest Bid</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {highestBids.map((bid, index) => {
                    const [title, highestBid] = Object.entries(bid)[0];
                    const cleanName = title.replace(/[{}=\d]/g, '');

                    return (
                      <TableRow key={`highestBids_${index}`}>
                        <TableCell>{`${cleanName}`}</TableCell>
                        <TableCell>{highestBid}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Box>
  );
}

export default AdminStatisticsPage;