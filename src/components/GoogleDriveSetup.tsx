
import React, { useState, useEffect } from 'react';
import { Cloud, Key, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface GoogleDriveSetupProps {
  onCredentialsSet: (isConnected: boolean) => void;
}

const GoogleDriveSetup = ({ onCredentialsSet }: GoogleDriveSetupProps) => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    checkExistingCredentials();
  }, [user]);

  const checkExistingCredentials = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('google_drive_connected')
        .eq('user_id', user.id)
        .single();

      if (data?.google_drive_connected) {
        setIsConnected(true);
        onCredentialsSet(true);
      }
    } catch (err) {
      console.log('No existing credentials found');
    }
  };

  const saveCredentials = async () => {
    if (!user || !clientId || !clientSecret || !apiKey) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Store credentials securely in Supabase
      const { error: settingsError } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          google_drive_client_id: clientId,
          google_drive_client_secret: clientSecret,
          google_drive_api_key: apiKey,
          google_drive_connected: true,
          updated_at: new Date().toISOString()
        });

      if (settingsError) throw settingsError;

      setIsConnected(true);
      onCredentialsSet(true);
      
      // Clear form
      setClientId('');
      setClientSecret('');
      setApiKey('');
    } catch (err: any) {
      setError(err.message || 'Failed to save credentials');
    } finally {
      setLoading(false);
    }
  };

  const disconnectDrive = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_settings')
        .update({
          google_drive_connected: false,
          google_drive_client_id: null,
          google_drive_client_secret: null,
          google_drive_api_key: null
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setIsConnected(false);
      onCredentialsSet(false);
    } catch (err: any) {
      setError(err.message || 'Failed to disconnect');
    } finally {
      setLoading(false);
    }
  };

  if (isConnected) {
    return (
      <div className="creative-card p-6" data-lov-id="google-drive-connected">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="text-green-500" size={24} />
          <h3 className="text-lg font-semibold text-card-foreground">Google Drive Connected</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Your Google Drive is successfully connected and ready for secure file storage.
        </p>
        <button
          onClick={disconnectDrive}
          disabled={loading}
          className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
        >
          {loading ? 'Disconnecting...' : 'Disconnect Google Drive'}
        </button>
      </div>
    );
  }

  return (
    <div className="creative-card p-6" data-lov-id="google-drive-setup">
      <div className="flex items-center space-x-3 mb-6">
        <Cloud className="text-blue-500" size={24} />
        <h3 className="text-lg font-semibold text-card-foreground">Connect Google Drive</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Client ID
          </label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Your Google OAuth Client ID"
            className="creative-input w-full px-3 py-2 text-card-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Client Secret
          </label>
          <input
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            placeholder="Your Google OAuth Client Secret"
            className="creative-input w-full px-3 py-2 text-card-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Your Google Drive API Key"
            className="creative-input w-full px-3 py-2 text-card-foreground"
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-destructive">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <button
          onClick={saveCredentials}
          disabled={loading || !clientId || !clientSecret || !apiKey}
          className="creative-button w-full flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Save size={16} />
          <span>{loading ? 'Connecting...' : 'Connect Google Drive'}</span>
        </button>

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
          <p className="font-semibold mb-1">To get your credentials:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Go to Google Cloud Console</li>
            <li>Create a new project or select existing</li>
            <li>Enable Google Drive API</li>
            <li>Create OAuth 2.0 credentials</li>
            <li>Add your domain to authorized origins</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default GoogleDriveSetup;
