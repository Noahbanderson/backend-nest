export class KeyRegistry {
	// Metadata Keys
	static readonly PUBLIC_KEY = 'public'
	static readonly CHECK_POLICIES_KEY = 'check-policy'

	// Provider Keys
	static readonly CONFIG_OPTIONS_KEY = Symbol.for('config-options')

	// Constants
	static readonly FIREBASE_AUTH_KEY = 'firebase-auth'
}
