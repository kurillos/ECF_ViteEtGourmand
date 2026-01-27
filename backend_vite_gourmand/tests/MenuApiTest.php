<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class MenuApiTest extends WebTestCase
{
    public function testMenuApiReturnsSuccess(): void
    {
        $client = static::createClient();
        
        // Testl'un des menus créés par les Fixtures
        // Attention : l'URL doit être encodée pour les espaces
        $client->request('GET', '/api/menu/Le%20Traditionnel');

        // Vérifie que le code HTTP est 200 (OK)
        $this->assertResponseIsSuccessful();
        
        // Vérifie que l'en-tête est bien du JSON
        $this->assertResponseHeaderSame('Content-Type', 'application/json');

        // Vérifie que le JSON contient les bonnes clés
        $responseContent = $client->getResponse()->getContent();
        $this->assertStringContainsString('nom', $responseContent);
        $this->assertStringContainsString('prix', $responseContent);
    }
}