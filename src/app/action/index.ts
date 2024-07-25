"use server";

import prisma from "utils/prisma";
import { auth } from "@/auth";

const getAllLinks = async () => {
  const session = await auth();

  if (!session?.user)
    return { error: "User not authenticated", success: false };
  try {
    const links = await prisma.links.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return {
      success: true,
      links,
    };
  } catch (e: any) {
    return {
      error: e.message,
      success: false,
    };
  }
};

interface LinkProps {
  id?: string;
  link: string;
  platform: string;
}

const CreateLink = async (newLinks: LinkProps[]) => {
  const session = await auth();

  if (!session?.user)
    return { error: "User not authenticated", success: false };
  try {
    const linksToCreate = newLinks.map((link) => ({
      ...link,
      userId: session.user.id,
    }));

    const createLinks = await prisma.links.createMany({
      data: linksToCreate,
      skipDuplicates: true,
    });

    return {
      success: true,
      createdCount: createLinks.count,
    };
  } catch (e: any) {
    return {
      error: e.message,
      success: false,
    };
  }
};

const CreateOrUpdateLink = async (links: LinkProps[]) => {
  const session = await auth();

  if (!session?.user)
    return { error: "User not authenticated", success: false };

  try {
    const newLinks = links.filter((link) => !link.id);
    const updatedLinks = links.filter((link) => link.id);

    // Create new links
    await prisma.links.createMany({
      data: newLinks.map((link) => ({
        ...link,
        userId: session.user.id,
      })),
    });

    // Update existing links
    await Promise.all(
      updatedLinks.map((link) =>
        prisma.links.update({
          where: { id: link.id },
          data: {
            platform: link.platform,
            link: link.link,
          },
        })
      )
    );

    const allLinks = await prisma.links.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return {
      success: true,
      links: allLinks,
    };
  } catch (e: any) {
    return {
      error: e.message,
      success: false,
    };
  }
};

const getLinks = async (id: string) => {
  try {
    const links = await prisma.links.findMany({
      where: {
        userId: id,
      },
    });

    return {
      success: true,
      links,
    };
  } catch (e: any) {
    return {
      error: e.message,
      success: false,
    };
  }
};

const getUserbyId = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return {
      success: true,
      user,
    };
  } catch (e: any) {
    return {
      error: e.message,
      success: false,
    };
  }
};

export { getAllLinks, CreateLink, CreateOrUpdateLink, getLinks, getUserbyId };
