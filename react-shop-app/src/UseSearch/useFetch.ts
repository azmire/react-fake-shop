import { useEffect, useState } from "react";
import { Root } from "../@types/ItemTypes";

function useFetch(url: URL) {
  const [items, setItems] = useState<Root | null>(null);
  const [loading, setLoading] = useState(false);

  const GetItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (response.ok) {
        const result = (await response.json()) as Root;
        setItems(result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetItems();
  }, []);

  return { items, loading };
}

export default useFetch;
