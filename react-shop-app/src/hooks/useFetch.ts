import { useEffect, useState } from "react";
import { ProductItem } from "../@types/ItemTypes";

function useFetch(url: string) {
  const [items, setItems] = useState<ProductItem[]>([] as ProductItem[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const GetItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = (await response.json()) as ProductItem[];
        setItems(result);
        setError(null);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetItems();
  }, []);

  return { items, loading, error };
}

export default useFetch;
