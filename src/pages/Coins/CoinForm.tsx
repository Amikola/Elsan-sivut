import { useState } from 'react';
import { API_URL } from '../../../secrets.tsx';

type CoinFormProps = {
  bearerToken: string;
};

type Coin = {
  country: string;
  coinName: string;
  denomination: string;
  currency: string;
  year: string;
  quantity: string;
  comments: string;
};

const emptyCoin: Coin = {
  country: '',
  coinName: '',
  denomination: '',
  currency: '',
  year: '',
  quantity: '1',
  comments: '',
};

const maxImages = 5;
const maxImageSize = 10 * 1024 * 1024;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.split(',')[1] ?? '');
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function CoinForm({ bearerToken }: CoinFormProps) {
  const [coin, setCoin] = useState<Coin>(emptyCoin);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const updateCoin = (field: keyof Coin, value: string) => {
    setCoin(current => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setSaving(true);

    try {
      const images = await Promise.all(
        imageFiles.map(async file => ({
          data: await fileToBase64(file),
          type: file.type,
        })),
      );

      const response = await fetch(`${API_URL}/createCoin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({
          ...coin,
          year: Number(coin.year),
          quantity: Number(coin.quantity),
          images,
        }),
      });

      const responseText = await response.text();
      let body: { error?: string; message?: string; coinId?: string };

      try {
        body = JSON.parse(responseText);
      } catch {
        body = { error: responseText };
      }

      if (!response.ok) {
        throw new Error(body.error || body.message || 'Coin creation failed');
      }

      setMessage(`Coin created: ${body.coinId ?? 'successfully'}`);
      setCoin(emptyCoin);
      setImageFiles([]);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Request failed',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="coin-form-section">
      <h2>Add coin</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Country
          <input
            value={coin.country}
            onChange={event => updateCoin('country', event.target.value)}
            required
          />
        </label>

        <label>
          Coin name
          <input
            value={coin.coinName}
            onChange={event => updateCoin('coinName', event.target.value)}
            required
          />
        </label>

        <label>
          Denomination
          <input
            value={coin.denomination}
            onChange={event => updateCoin('denomination', event.target.value)}
            required
          />
        </label>

        <label>
          Currency
          <input
            value={coin.currency}
            onChange={event => updateCoin('currency', event.target.value)}
            required
          />
        </label>

        <label>
          Year
          <input
            type="number"
            min="1"
            value={coin.year}
            onChange={event => updateCoin('year', event.target.value)}
            required
          />
        </label>

        <label>
          Quantity
          <input
            type="number"
            min="1"
            value={coin.quantity}
            onChange={event => updateCoin('quantity', event.target.value)}
            required
          />
        </label>

        <label>
          Comments
          <textarea
            value={coin.comments}
            onChange={event => updateCoin('comments', event.target.value)}
          />
        </label>

        <label>
          Coin images
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={event => {
              const selectedFiles = Array.from(event.target.files ?? []);

              if (selectedFiles.length > maxImages) {
                setError(`You can select up to ${maxImages} images.`);
                setImageFiles([]);
                return;
              }

              if (selectedFiles.some(file => file.size > maxImageSize)) {
                setError('Each image must be smaller than 10 MB.');
                setImageFiles([]);
                return;
              }

              setError(null);
              setImageFiles(selectedFiles);
            }}
          />
        </label>

        {imageFiles.length > 0 && (
          <p>{imageFiles.length} image(s) selected</p>
        )}

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Add coin'}
        </button>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
}

export default CoinForm;
