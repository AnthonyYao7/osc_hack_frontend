import GeneralLayout from "./GeneralLayout";
import {useEffect} from "react";
import {getCookie} from "cookies-next";
import {useRouter} from "next/navigation";


export default function AuthenticatedPage({children,}:
                                            Readonly<{
                                              children: React.ReactNode;
                                            }>) {
  const router = useRouter();

  useEffect(() => {
    if (getCookie('token') == undefined) {
      router.push('/');
    }
  }, [router]);


  return (
    <GeneralLayout>
      {children}
    </GeneralLayout>
  )
}