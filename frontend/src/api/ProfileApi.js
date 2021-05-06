import Api from "./Api";

class ProfilesApi {
    getAllProfiles() {
        return Api.get('/profile');
    }

    getProfileById(id) {
        return Api.get('/profile/' + id);
    }

    createProfile(profile) {
        return Api.post('/profile', profile);
    }

    updateProfile(profile, id) {
        return Api.put('/profile/' + id, profile);
    }

    deleteProfile(id) {
        return Api.delete('/profile/' + id);
    }
}

export default new ProfilesApi();