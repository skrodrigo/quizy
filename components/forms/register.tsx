import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function RegisterForm() {
    return (
        <section className="flex min-h-screen bg-background px-4 py-16 md:py-32 dark:bg-transparent">
            <form action="" className="max-w-92 m-auto h-fit w-full">

                <div className="p-6">

                    <div className="flex items-center flex-col justify-center mb-4">
                        <Link href="/" aria-label="go home">
                            <Image src="/quizy.svg" alt="Quizy" width={100} height={100} className="w-32" />
                        </Link>
                        <p className="text-xl font-light text-foreground">Registrar</p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="block text-sm">
                                Email
                            </Label>
                            <Input type="email" required name="email" id="email" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="block text-sm">
                                Senha
                            </Label>
                            <Input type="password" required name="password" id="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="block text-sm">
                                Por onde você viu o Quizy?
                            </Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="instagram">Instagram</SelectItem>
                                        <SelectItem value="facebook">Facebook</SelectItem>
                                        <SelectItem value="google">Google</SelectItem>
                                        <SelectItem value="indicação">Indicação</SelectItem>
                                        <SelectItem value="tiktok">Tiktok</SelectItem>
                                        <SelectItem value="outro">Outro</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>



                        <Button className="w-full">Continue</Button>

                    </div>

                    <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <hr className="border-dashed" />
                        <span className="text-muted-foreground text-xs">
                            ou
                        </span>
                        <hr className="border-dashed" />
                    </div>

                    <div className="mt-4">
                        <Button type="button" variant="outline" className="w-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="0.98em"
                                height="1em"
                                viewBox="0 0 256 262"
                            >
                                <path
                                    fill="#4285f4"
                                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                ></path>
                                <path
                                    fill="#34a853"
                                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                ></path>
                                <path
                                    fill="#fbbc05"
                                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                                ></path>
                                <path
                                    fill="#eb4335"
                                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                ></path>
                            </svg>
                            <span>Google</span>
                        </Button>
                    </div>
                </div>

                <p className="text-accent-foreground text-center text-sm">
                    Já tem uma conta ?
                    <Button asChild variant="link" className="px-2">
                        <Link href="/auth/login">Faça login</Link>
                    </Button>
                </p>
            </form>
        </section>
    );
}
