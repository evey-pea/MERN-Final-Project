import React, { useState, useContext } from 'react';
import { Box, Grid, Container } from '@material-ui/core';
import PostCardLarge from '../post/PostCardLarge';
import PostCardSmall from '../post/PostCardSmall';
import PostModal from '../post/PostModal';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import UserContext from '../../context/UserContext';

const ToggleDisplayView = ({
  posts,
  defaultView,
  searchValue,
  setSearchValue
}) => {
  const [displayView, setDisplayView] = useState(defaultView);
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { userData } = useContext(UserContext);

  const handleDisplayView = (event, newDisplayView) => {
    if (newDisplayView !== null) {
      setDisplayView(newDisplayView);
    }
  };

  const handleModal = (post) => {
    setModalContent(post);
    setModalState(!modalState);
  };

  return (
    <Container style={{ marginBottom: 100 }}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        <ToggleButtonGroup
          value={displayView}
          exclusive
          onChange={handleDisplayView}
          aria-label='display alignment'
        >
          <ToggleButton
            value='single'
            aria-label='display results in single column'
          >
            <ViewDayIcon />
          </ToggleButton>
          <ToggleButton
            value='multiple'
            aria-label='display results in multiple columns'
          >
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {modalContent !== null && (
        <PostModal
          modalState={modalState}
          handleModalChange={handleModal}
          modalContent={modalContent}
        />
      )}
      <Grid item container justify='center' spacing={2}>
        {displayView === 'single' ? (
          posts.map((post, index) => {
            if (post.visibility === '0') {
              return (
                <Grid key={index} item style={{ width: '100%' }}>
                  <PostCardLarge
                    postContent={post}
                    openModal={() => handleModal(post)}
                    userData={userData}
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                  />
                </Grid>
              );
            } else if (post.visibility === '1' && userData.user) {
              return (
                <Grid key={index} item style={{ width: '100%' }}>
                  <PostCardLarge
                    postContent={post}
                    openModal={() => handleModal(post)}
                    closeModal={() => setModalState(!modalState)}
                    userData={userData}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                </Grid>
              );
            } else if (
              post.visibility === '2' &&
              post.authorID === userData.user
            ) {
              return (
                <Grid key={index} item style={{ width: '100%' }}>
                  <PostCardLarge
                    postContent={post}
                    openModal={() => handleModal(post)}
                    userData={userData}
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                  />
                </Grid>
              );
            } else {
              return null;
            }
          })
        ) : (
          <Box
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'space-between',
              flexWrap: 'wrap'
            }}
          >
            {posts.map((post, index) => {
              if (post.visibility === '0') {
                return (
                  <PostCardSmall
                    postContent={post}
                    openModal={() => handleModal(post)}
                    key={index}
                  />
                );
              } else if (post.visibility === '1' && userData.user) {
                return (
                  <PostCardSmall
                    postContent={post}
                    openModal={() => handleModal(post)}
                    key={index}
                  />
                );
              } else if (
                post.visibility === '2' &&
                post.authorID === userData.user
              ) {
                return (
                  <PostCardSmall
                    postContent={post}
                    openModal={() => handleModal(post)}
                    key={index}
                  />
                );
              } else {
                return null;
              }
            })}
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default ToggleDisplayView;
