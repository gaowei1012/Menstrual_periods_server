module.exports = {
    hooks: {
        'pre-commit': 'lint-staged',
        '**/*.{md,json}': ['prettier --write', 'git add'],
    },
}
