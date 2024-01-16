const mongoose = require('mongoose');

const githubIntegrationSchema = new mongoose.Schema({
    login: { type: String },
    github_id: { type: Number, required: true },
    node_id: { type: String },
    avatar_url : { type: String },
    url: { type: String },
    name: { type: String },
    blog: { type: String },
    location: { type: String },
    email: { type: String },
    public_repos: { type: Number },
    public_gists: { type: Number },
    followers: { type: Number },
    following: { type: Number },
    github_created_at: { type: Date },
    github_updated_at: { type: Date },
    total_private_repos: { type: Number },
    owned_private_repos:  { type: Number },
    collaborators: { type: Number },
    two_factor_authentication: { type: Boolean },
    plan: {
        name: { type: String },
        space: { type: Number },
        collaborators: { type: Number },
        private_repos: { type: Number },
    },
    last_request: { type: Date, default: Date.now() },
    archived: { type: Number, default: 0 }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


githubIntegrationSchema.index({
    created_at: -1
});


githubIntegrationSchema.index({
    github_id: 1,
    archived: 1,
}, { unique: true });

const GitHubIntegration = mongoose.model('github-integration', githubIntegrationSchema);

module.exports = GitHubIntegration;