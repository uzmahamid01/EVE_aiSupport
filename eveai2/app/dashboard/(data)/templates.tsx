export default [
    {
        name: 'Text Generator',
        description: 'Generate text based on a prompt',
        icon: '',
        category: '',
        aiPrompt: 'Give me 5 best Programming languages, and why are they best?',
        slug: 'generate-text',
        form: [
            {
                label: 'Enter your text niche',
                field: 'input',
                name: 'niche',
                required: true
            },
            {
                label: 'Enter your text prompt',
                field: 'textarea',
                name: 'outline'
            }
        ]
    }
]