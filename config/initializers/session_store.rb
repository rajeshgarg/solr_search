# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_search_session',
  :secret      => '7cd741010012eeb0d175dbc09247dc451b651f3e5e214248a842410e4f1078127644273c4e83d0a07dfea5dc777aeb5b7541c4c1bac1c6b28d16c042d5b6a5cc'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
