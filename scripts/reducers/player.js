import * as types from '../constants/ActionTypes';

function playlist(state = {
    lastUpdated: null,
    songs: []
}, action) {
    switch(action.type) {
    case types.ADD_SONGS_TO_PLAYLIST:
        return Object.assign({}, state, {
            songs: state.songs.concat(action.songs),
        });

    case types.PLAY_SONG:
        return Object.assign({}, state, {
            lastUpdated: action.lastUpdated,
            songs: action.songs
        });

    default:
        return state;
    }
}

function playlists(state = {}, action) {
    switch(action.type) {
    case types.ADD_SONGS_TO_PLAYLIST:
        return Object.assign({}, state, {
            [action.activePlaylist]: playlist(state[action.activePlaylist], action)
        });

    case types.PLAY_SONG:
        return Object.assign({}, state, {
            [action.activePlaylist]: playlist(state[action.activePlaylist], action)
        });

    default:
        return state;
    }
}

export default function player(state = {
    activeSongIndex: null,
    activePlaylist: null,
    playlists: {}
}, action) {
    switch(action.type) {
    case types.ADD_SONGS_TO_PLAYLIST:
        return Object.assign({}, state, {
            playlists: playlists(state.playlists, action)
        });

    case types.PLAY_SONG:
        return Object.assign({}, state, {
            activeSongIndex: action.activeSongIndex,
            activePlaylist: action.activePlaylist,
            playlists: playlists(state.playlists, action)
        });

    default:
        return state;
    }
}