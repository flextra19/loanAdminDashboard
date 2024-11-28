import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import "../toggle.css"

export function SearchInput() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isChecked, setIsChecked] = useState<boolean>(true)

  function toggleAction() {
    let params = new URLSearchParams({ q: (!isChecked).toString() });
    setIsChecked(prev => !prev);
    startTransition(() => {
      router.replace(`/?${params.toString()}`);
    });
  }

  return (
    <div className="checkbox-wrapper-8">
      <input type="checkbox" id="cb3-8" className="tgl tgl-skewed" checked={isChecked} onChange={toggleAction}/>
      <label htmlFor="cb3-8" data-tg-on="MAINNET ON" data-tg-off="MAINNET OFF" className="tgl-btn"></label>
    </div>
  );
}
